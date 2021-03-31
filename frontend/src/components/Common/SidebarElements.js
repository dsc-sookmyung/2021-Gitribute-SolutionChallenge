import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavIcon = styled(Link)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 1rem;
  height: 5rem;
  @media screen and (min-width: 601px) {
    display: none;
  }
`;

export const SidebarNav = styled.nav`
  background: #fff;
  width: 232px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  box-shadow: 3px 5px 5px 3px rgba(0, 0, 0, 0.1);

  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 16px;
  }
  ::-webkit-scrollbar-thumb {
      height: 6px;
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      -webkit-border-radius: 7px;
      background-color: #fff;
      -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
`;

export const SidebarWrap = styled.div`
  width: 100%;
`;

export const SidebarLink = styled(Link)`
  display: flex;
  color: #000;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  list-style: none;
  height: 4rem;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    border-left: 4px solid #9c27b0;
    cursor: pointer;
  }
  &:focus {
    color: #fff;
    background: #9c27b0;
    border-left: 4px solid #9c27b0;
  }
`;

export const SidebarTitleLabel = styled.div`
  display: flex;
  color: #000;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  list-style: none;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.7);
`;

export const SidebarLabel = styled.div`
  display: flex;
  color: #000;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.25rem;
  list-style: none;
  text-decoration: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.7);
`;

