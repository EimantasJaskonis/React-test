import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import Header from "../UI/organism/Header";
import Footer from "../UI/organism/Footer";
import CarsCard from '../UI/molecules/CarsCard';
import UsersContext from '../contexts/UsersContext';
import { User, CardType } from '../../types';

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(UsersContext);
  if (!context) throw new Error("UsersContext must be used within a Provider");

const { loggedInUser } = context;

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/users").then(res => res.json()),
      fetch("http://localhost:8080/cars").then(res => res.json())
    ])
      .then(([usersData, carsData]) => {
        setUsers(usersData);
        setCars(carsData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setUsers([]);
        setCars([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Main>
        <h1>Nissan Skyline History</h1>

        {isLoading ? (
          <img src="/loading.gif" alt="Loading..." />
        ) : (
          <>
            {users.length > 0 ? (
              users.map(user => (
                <div key={user.id}>
                  <h3>{user.name || user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.role || "No role"}</p>
                </div>
              ))
            ) : (
              <p>No users found...</p>
            )}

            {cars.length > 0 ? (
              <CardGrid>
                {cars.map((card) => (
                  <CardWrapper key={card.id}>
                    <CarsCard
                      card={card}
                      onEdit={
                        loggedInUser?.id === card.creatorId
                          ? (id: string ) => console.log("Edit", id)
                          : undefined
                      }
                      onDelete={
                        loggedInUser?.id === card.creatorId
                          ? (id: string ) => console.log("Delete", id)
                          : undefined
                      }
                      onSave={
                        loggedInUser ? (id: string ) => console.log("Save", id) : undefined
                      }
                    />
                  </CardWrapper>
                ))}
              </CardGrid>
            ) : (
              <p>No cars found...</p>
            )}
          </>
        )}
      </Main>
      <Footer />
    </>
  );
};

export default Home;

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