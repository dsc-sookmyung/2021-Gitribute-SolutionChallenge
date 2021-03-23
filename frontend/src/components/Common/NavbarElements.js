import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../assets/fonts/fonts.css';

export const Nav = styled.nav`
  background: #fff;
  height: 4rem;
  display: flex;
  padding: 0rem calc((100vw - 1194px) / 2);
  z-index: 10;
  justify-content: flex-start;
`;

export const NavLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight : bold;
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-family: 'Lobster', cursive;
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #9c27b0;
  }
  &:focus {
    border-bottom: 3px solid #9c27b0;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4rem;
  width: 100vw;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  padding: 0rem 1rem;
  color: #000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: #9c27b0;
  }
  &:focus {
    color: #9c27b0;
  }
`;

export const NavBtnUser = styled.div`
  padding: 0rem 1rem;
  color: #000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    color: #9c27b0;
  }
  &:focus {
    color: #9c27b0;
  }
`;
