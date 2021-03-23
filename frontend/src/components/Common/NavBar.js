import React, { useEffect, useState } from 'react';
import { Nav, NavLogo, NavLink, NavMenu, NavBtn, NavBtnLink, NavBtnUser } from './NavbarElements';
import styled, { StyleSheetManager } from 'styled-components';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

import AuthService from '../../services/auth.service';

const NavBar = () => {
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("USER");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [levelIcon, setLevelIcon] = useState("🌱");
  const [star, setStar] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setRole(user.role);
      setUsername(user.username);
      
      if (user.center) {
        setStar(user.center);
      }

      if (user.level) {
        user.level <= 10 ? (
          setLevelIcon("🌱")
        ) : (
          user.level < 30 ? (
            setLevelIcon("☘")
          ) : (
            user.level < 50 ? (
              setLevelIcon("🍀")
            ) : (
                setLevelIcon("🌼")
            )
          )
        )
      }
    }
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(currentUser));
  }, [currentUser]);

  const logout = () => {
    AuthService.logout();
    setRole(0);
    setUsername("USER");
    setStar(undefined);
  }

  return (
    <Nav>
      {/* 로그인 전 메인 : about 
          로그인 후 메인 : center */}
      <NavLogo to='/'>
        Blooming
      </NavLogo>
      <BarWrapper>
        <Sidebar role={role} currentUser={currentUser} logout={logout} levelIcon={levelIcon} star={star} />
      </BarWrapper>
      <NavMenu>
        <NavLink to='/' exact>
          About
        </NavLink>
        <NavLink to='/center'>
          {!star ? (
            "Choose your local LOGO Center"
          ) : (
            "Primary Center: 📍"+star
          )}
        </NavLink>
        <NavLink to='/faq'>
          FAQ
        </NavLink>
        <NavLink to='/contact'>
          Contact
        </NavLink>
      </NavMenu>
      <NavBtn>
      {role === 0 ? (
        <NavBtnLink to='/login'>Sign&nbsp;In</NavBtnLink>
      ) : (
        <UserInfo
        trigger={ <NavBtnUser>{username}</NavBtnUser> }
        currentUser={currentUser}
        logout={logout}
        levelIcon={levelIcon} />
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
