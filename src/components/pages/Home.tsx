import { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import Header from "../UI/organism/Header";
import Footer from "../UI/organism/Footer";
import CarsCard from '../UI/molecules/CarsCard';
import UsersContext from '../contexts/UsersContext';
import { useNavigate } from "react-router";
import { CardType } from '../../types';

const Home = () => {
  const [cars, setCars] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(UsersContext);
  if (!context) throw new Error("UsersContext must be used within a Provider");

  const { loggedInUser } = context;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/cars")
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setCars([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <Main>
        <h1>JDM Cars</h1>

        {isLoading ? (
          <img src="../assets/loading.gif" alt="Loading..." />
        ) : (
          <CardGrid>
            {cars.length > 0 ? (
              cars.map((card) => (
                <CardWrapper key={card.id}>
                  <CarsCard
                    card={card}
                    onEdit={undefined}
                    onDelete={undefined}
                    onSave={loggedInUser ? () => {} : undefined}
                  />
                </CardWrapper>
              ))
            ) : (
              <p>No cars found...</p>
            )}
          </CardGrid>
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
