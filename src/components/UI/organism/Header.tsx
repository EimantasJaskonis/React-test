import { Link, NavLink } from "react-router";
import styled from 'styled-components';
// import { useContext } from "react";

import logo from '../../assets/logo.jpg';

const Header = () => {

  return (
    <header>
     <Link to="/">
      <Logo src={logo} alt="logo" />
     </Link>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  )
};

const Logo = styled.img`
  display: block;
  margin: 2rem auto 1rem auto;
  width: 100px;
`;

export default Header;