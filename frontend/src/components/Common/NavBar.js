import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import { makeStyles } from '@material-ui/core/styles';
import { Nav, NavLogo, NavLink, NavMenu, NavBtn, NavBtnLink, NavBtnUser } from './NavbarElements';
import Sidebar from './Sidebar';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme) => ({
  barWrapper: {
    display: "none",
    color: "#fff",
    '@media screen and (max-width: 768px)': {
      display: "flex",
      alignSelf: "center",
      justifyContent: "flex-end",
      width: "100vw",
      padding: "1rem",
      fontSize: "1.5rem",
      cursor: "pointer"
    }
  }
}));

const NavBar = ({ updated }) => {
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("USER");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [levelIcon, setLevelIcon] = useState("🌱");
  const [star, setStar] = useState(undefined);
  const classes = useStyles();

  useEffect(async () => {
    await UserService.getUserInfo();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setRole(user.role);
      setUsername(user.username);
      
      setStar(user.center);
      
      if (user.total) {
        user.total >= 120 ? setLevelIcon("🦋") :
        user.total >= 110 ? setLevelIcon("🌼🌼🌼") :
        user.total >= 100 ? setLevelIcon("🌼🌼") :
        user.total >= 90 ? setLevelIcon("🌼") :
        user.total >= 80 ? setLevelIcon("🍀🍀🍀") : 
        user.total >= 70 ? setLevelIcon("🍀🍀") :
        user.total >= 60 ? setLevelIcon("🍀") :
        user.total >= 50 ? setLevelIcon("🌿🌿🌿") :
        user.total >= 40 ? setLevelIcon("🌿🌿") :
        user.total >= 30 ? setLevelIcon("🌿") :
        user.total >= 20 ? setLevelIcon("🌱🌱🌱") :
        user.total >= 10 ? setLevelIcon("🌱🌱") : setLevelIcon("🌱")
      }
    }
  }, [updated]);

  useEffect(() => {

  }, [currentUser]);

  useEffect(() => {

  }, [star]);

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
      <div className={classes.barWrapper}>
        <Sidebar role={role} currentUser={currentUser} logout={logout} levelIcon={levelIcon} star={star} />
      </div>
      <NavMenu>
        <NavLink to='/' exact>
          About
        </NavLink>
        <NavLink to='/center'>
          {!star ? (
            "Choose your local Blooming Center"
          ) : (
            "Primary Center: 📍 "+star
          )}
        </NavLink>
        <NavLink to='/rankings'>
          Rankings
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
