import React, { useState } from 'react';
import { Nav, NavLogo, NavLink, NavMenu, NavBtn, NavBtnLink, NavBtnUser } from './NavbarElements';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

const NavBar = () => {
  const [role, setRole] = useState(0);

  return (
    <Nav>
      {/* 로그인 전 메인 : about 
          로그인 후 메인 : center */}
      <NavLogo to='/'>
        Blooming
      </NavLogo>
      <BarWrapper>
        <Sidebar/>
      </BarWrapper>
      <NavMenu>
        <NavLink to='/' exact activeStyle>
          About
        </NavLink>
        <NavLink to='/center' activeStyle>
          Choose your local LOGO Center
        </NavLink>
        <NavLink to='/faq' activeStyle>
          FAQ
        </NavLink>
        <NavLink to='/contact' activeStyle>
          Contact
        </NavLink>
      </NavMenu>
      <NavBtn>
        { role === 0 ? (
          <NavBtnLink to='/login'>Sign&nbsp;In</NavBtnLink>
        ) : (
          <UserInfo
          trigger={ <NavBtnUser>User</NavBtnUser> }
          role={0} 
          userName="User" />
        )}
      </NavBtn>
    </Nav>
  );
}

export default NavBar;

const BarWrapper = styled.div`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: flex;
    align-self: center;
    justify-content: flex-end;
    width: 100vw;
    padding: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;
