import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../UI/organism/Header';
import Footer from '../UI/organism/Footer';
import UsersContext from '../contexts/UsersContext';
import { CardType } from '../../types';
import CarsCard from '../UI/molecules/CarsCard';
import { useNavigate } from 'react-router';

const User = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error('UsersContext must be used within a Provider');

  const { loggedInUser, setLoggedInUser, users, dispatch } = context;
  const [userCards, setUserCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) return;

    fetch('http://localhost:8080/cars')
      .then(res => res.json())
      .then((data: CardType[]) => {
        const filtered = data.filter(card => card.creatorId === loggedInUser.id);
        setUserCards(filtered);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user cards:', error);
        setLoading(false);
      });
  }, [loggedInUser]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setModalVisible(true);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setModalVisible(false);
  };

  const handleDeleteConfirmed = () => {
    if (!deleteId) return;
    fetch(`http://localhost:8080/cars/${deleteId}`, {
      method: "DELETE"
    })
      .then(() => {
        setUserCards(prev => prev.filter(c => c.id !== deleteId));
        setModalVisible(false);
        setDeleteId(null);
      })
      .catch(err => console.error("Delete failed:", err));
  };

  const handleSave = (cardId: string) => {
    if (!loggedInUser) return;

    const alreadySaved = loggedInUser.saved?.includes(cardId);
    const updatedSaved = alreadySaved
      ? loggedInUser.saved?.filter(id => id !== cardId)
      : [...(loggedInUser.saved || []), cardId];

    const updatedUser = { ...loggedInUser, saved: updatedSaved };

    fetch(`http://localhost:8080/users/${loggedInUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    })
      .then(() => {
        setLoggedInUser(updatedUser);
        const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
        dispatch({ type: "setData", payload: updatedUsers });
      })
      .catch(err => console.error("Save failed:", err));
  };

  if (!loggedInUser) {
    return (
      <>
        <Header />
        <Main>
          <p>Login to view your account</p>
        </Main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Main>
        <h2>Your JDM Cars</h2>
        {loading ? (
          <img src="../assets/loading.gif" alt="Loading..." />
        ) : userCards.length === 0 ? (
          <p>Empty</p>
        ) : (
          <CardGrid>
            {userCards.map(card => (
              <CardWrapper key={card.id}>
                <CarsCard
                  card={card}
                  onEdit={handleEdit}
                  onDelete={confirmDelete}
                  onSave={handleSave}
                />
              </CardWrapper>
            ))}
          </CardGrid>
        )}
      </Main>
      <Footer />

      {modalVisible && (
        <ModalOverlay>
          <Modal>
            <p>Are you sure you want to delete?</p>
            <ModalButtons>
              <button onClick={handleDeleteConfirmed}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </ModalButtons>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default User;

const Main = styled.main`
  padding: 20px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
`;

const CardWrapper = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 8px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
  color: black;
`;

const ModalButtons = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;

  button {
    padding: 0.5rem 1rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-child {
      background-color: red;
      color: white;
    }

    &:last-child {
      background-color: #ccc;
    }
  }
`;
