import { Outlet } from 'react-router';
import Header from '../UI/organism/Header';
import Footer from '../UI/organism/Footer';

const MainOutlet = () => {
  return (
    <>
      <Header />
       <main>
        <Outlet />
       </main>
      <Footer />
    </>
  );
};

export default MainOutlet;
