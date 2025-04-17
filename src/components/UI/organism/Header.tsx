import { Link, NavLink, useNavigate } from "react-router";
import styled from 'styled-components';
import { useContext } from "react";

import logo from '../../assets/logo.jpg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <section>
     <Link to="/">
      <Logo src={logo} alt="Go to Home" />
     </Link>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </section>
  )
};

const Logo = styled.img`
  display: block;
  margin: 2rem auto 1rem auto;
  width: 20px;
`;