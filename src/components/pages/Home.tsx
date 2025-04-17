import { useEffect, useState } from "react";
import Header from "../UI/organism/Header";
import Footer from "../UI/organism/Footer";
import { User } from '../../types';

const Home = () => {
    const [entries, setEntries] = useState<User[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetch("http://localhost:8080/entries")
        .then((res) => res.json())
        .then((data: User[]) => {
          setEntries(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading entries:", error);
          setEntries([]);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <>
        <Header />
        <main>
          <h1>Nissan Skyline GT-R</h1>
          {isLoading ? (
            <img src="/loading.gif" alt="Loading..." />
          ) : entries && entries.length > 0 ? (
            entries.map((entry) => (
              <div key={entry.id}>
                <h3>{entry.name}</h3>
                <p>{entry.email}</p>
                <p>{entry.role}</p>
              </div>
            ))
          ) : (
            <p>No entries found...</p>
          )}
        </main>
        <Footer />
      </>
    );
  };
  
  export default Home;