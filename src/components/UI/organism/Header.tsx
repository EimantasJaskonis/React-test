// import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import UsersContext from '../..//contexts/UsersContext';
import { useContext } from "react";

import logo from '../../assets/logo.jpg';

const Header = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('Header must be used within a UsersProvider');
  }

  const { loggedInUser, setLoggedInUser } = context;

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <HeaderWrapper>
      <Link to="/">
        <Logo src={logo} alt="logo" />
      </Link>
      <div>
        {loggedInUser ? (
          <UserInfo>
            <Avatar src={loggedInUser.avatar || '../../assets/avatar.png'} alt="Avatar" />
            <span>{loggedInUser.name}</span>
            <button onClick={handleLogout}>Logout</button>
            <ButtonLink to="/add">Add Car</ButtonLink>
            <ButtonLink to="/user">User</ButtonLink>
          </UserInfo>
        ) : (
          <LinkGroup>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </LinkGroup>
        )}
      </div>
    </HeaderWrapper>
  );
};


const Logo = styled.img`
  display: block;
  margin: 2rem auto 1rem auto;
  width: 150px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #111;
  color: white;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const LinkGroup = styled.div`
  /* justify-content: center;  */
  display: flex;
  gap: 0.5rem;
`;

interface ButtonLinkProps {
  width?: string;
  height?: string;
  fontSize?: string;
  borderRadius?: string;
}

const ButtonLink = styled(Link)<ButtonLinkProps>`
  all: unset;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width || '65px'};
  height: ${({ height }) => height || '21.5px'};
  font-size: ${({ fontSize }) => fontSize || '0.84rem'};
  line-height: 1;
  

  border: 1px solid buttonface;
  border-radius: ${({ borderRadius }) => borderRadius || '2.5px'};
  background-color: buttonface;
  color: buttontext;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  user-select: none;

  &:active {
    border-style: inset;
  }

  &:focus {
    outline: 1px dotted;
  }
`;

export default Header;