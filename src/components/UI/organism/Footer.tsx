// import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const Footer = () => {
    return (
      <FooterWrapper>
      <p>© 1969 - 2025 JDM | Privacy Policy | Terms & Conditions</p>
      <LinkGroup>
        <Link to="/cookies">Cookies</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms and Uses</Link>
      </LinkGroup>
      <LinkGroup>
        <Link to="https://facebook.com">Facebook</Link>
        <Link to="https://instagram.com">Instagram</Link>
        <Link to="https://linkedin.com">LinkedIn</Link>
        <Link to="https://x.com">X</Link>
      </LinkGroup>
      </FooterWrapper>
    );
  };
  
  export default Footer;
  
  const FooterWrapper = styled.footer`
  padding: 1rem;
  background-color: #111;
  color: white;
  text-align: center;
`;

  const LinkGroup = styled.div`
  justify-content: center; 
  display: flex;
  gap: 0.5rem;
`;