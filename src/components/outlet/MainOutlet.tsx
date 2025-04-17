import { Outlet } from 'react-router';
import Header from '../UI/organism/Header';

const MainOutlet = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainOutlet;
