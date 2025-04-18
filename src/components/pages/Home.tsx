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
        <Title>Japanese Domestic Market</Title>

        {isLoading ? (
          <img src="../assets/loading.gif" alt="Loading..." />
        ) : (
          <>
            <VideoWrapper>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/PD8XrVwcJ44"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoWrapper>
            <Centered>JDM Cars</Centered>
            <DescriptionWrapper>
              <p>
              The term "Japanese domestic market" ("JDM") refers to Japan's home market for vehicles and vehicle parts. Japanese owners contend with a strict motor vehicle inspection and grey markets. JDM is also incorrectly used as a term colloquially to refer to cars produced in Japan but sold in other countries.

              The average age of JDM cars is 8.7 years, ranking 9th in a survey of 30 of the top 50 countries by gross domestic product. According to the Fédération Internationale de l'Automobile, a car in Japan travels a yearly average of over only 9,300 kilometres, less than half the U.S. average of 19,200 kilometres.

              Japanese domestic market vehicles may differ greatly from the cars that Japanese manufacturers build for export and vehicles derived from the same platforms built in other countries. The Japanese car owner looks more toward innovation than long-term ownership which forces Japanese carmakers to refine new technologies and designs first in domestic vehicles. For instance, the 2003 Honda Inspire featured the first application of Honda's Variable Cylinder Management. However, the 2003 Honda Accord V6, which was the same basic vehicle, primarily intended for the North American market, did not feature VCM, which had a poor reputation after Cadillac's attempt in the 1980s with the V8-6-4 engine. VCM was successfully introduced to the Accord V6 in its redesign for 2008.

              In 1988, JDM cars were limited by voluntary self-restraints among manufacturers to 280 PS (276 hp; 206 kW) and a top speed of 300 km/h (186 mph), limits imposed by the Japan Automobile Manufacturers Association (JAMA) for safety. The horsepower limit was lifted in 2004 [citation needed] but the speed limit of 180 km/h (112 mph) remains.
              </p>
            </DescriptionWrapper>
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

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const VideoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  iframe {
    width: 100%;
    height: 400px;
    max-width: 700px;
  }
`;

const Centered = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: grey;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin: 0 auto;
  max-width: 1250px; 
  box-sizing: border-box;
  p {
    text-align: justify;
  }
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
  justify-content: center;
`;

const CardWrapper = styled.div`
  width: 300px;
  background-color: grey;
  border: 1px solid #ccc;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 8px;
`;
