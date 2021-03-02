import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #000;
  height: 4rem;
  display: flex;
  padding: 0rem calc((100vw - 1194px) / 2);
  z-index: 10;
  justify-content: flex-start;
`;

export const NavLogo = styled(Link)`
  font-size: 1.5rem;
  font-weight : bold;
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
  &: hover {
    color: #15cdfc;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4rem;
  // margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
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
  border-radius: 4px;
  // background: #9c27b0;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    // background: #fff;
    color: #15cdfc; // #9c27b0;
  }
  &.active {
    color: #15cdfc;
  }
`;