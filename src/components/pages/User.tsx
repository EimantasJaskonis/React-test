import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../UI/organism/Header';
import Footer from '../UI/organism/Footer';
import UsersContext from '../contexts/UsersContext';
import { CardType } from '../../types';
import CarsCard from '../UI/molecules/CarsCard';

const User = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error('UsersContext must be used within a Provider');

  const { loggedInUser } = context;
  const [savedCards, setSavedCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser) return;

    fetch('http://localhost:8080/cars')
      .then(res => res.json())
      .then((data: CardType[]) => {
        const filtered = data.filter(card => loggedInUser.saved?.includes(card.id));
        setSavedCards(filtered);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error...', error);
        setLoading(false);
      });
  }, [loggedInUser]);

  if (!loggedInUser) {
    return (
      <>
        <Header />
        <Main>
          <p>Login to view saved cards</p>
        </Main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Main>
        <h2>JDM Cars</h2>
        {loading ? (
          <img src="../assets/loading.gif" alt="Kraunama..." />
        ) : savedCards.length === 0 ? (
          <p>Empty</p>
        ) : (
          <CardGrid>
            {savedCards.map(card => (
              <CardWrapper key={card.id}>
                <CarsCard card={card} />
              </CardWrapper>
            ))}
          </CardGrid>
        )}
      </Main>
      <Footer />
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
