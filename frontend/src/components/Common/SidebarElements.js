import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
  height: 5rem;
`;

export const SidebarNav = styled.nav`
  background: #000;
  width: 232px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;

export const SidebarLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  list-style: none;
  height: 4rem;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    background: #252831;
    border-left: 4px solid #9c27b0;    // purple[500]
    cursor: pointer;
  }
`;
