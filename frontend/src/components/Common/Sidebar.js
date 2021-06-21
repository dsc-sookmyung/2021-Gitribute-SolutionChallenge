import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavIcon, SidebarNav, SidebarWrap, SidebarLink, SidebarTitleLabel, SidebarLabel } from './SidebarElements';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
  },
  pointLink: {
    color: 'inherit', 
    textDecoration: 'inherit',
    fontWeight: 'bold'
  },
}));

const Sidebar = ({ role, currentUser, logout, levelIcon, star }) => {
  const [sidebar, setSidebar] = useState(false);
  const [dropBox, setDropBox] = useState(false);
  const classes = useStyles();

  const showSidebar = () => setSidebar(!sidebar);
  const showdropBox = () => setDropBox(!dropBox);

  return (
    <>
      <NavIcon>
        <MenuIcon className={classes.menu} onClick={showSidebar} fontSize="large" style={{ color: "000" }} />
      </NavIcon>
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to='#'>
            <CloseIcon onClick={showSidebar} color="secondary"/>
          </NavIcon>
          <SidebarLink to='/'>About</SidebarLink>
          <SidebarLink to='/center'>{!star ? ("Choose your local LOGO Center") : ("Primary Center: 📍"+star)}</SidebarLink>
          <SidebarLink to='/rankings'>Rankings</SidebarLink>
          { role === 0 ? (
            <SidebarLink to='/login'>Sign&nbsp;In</SidebarLink>
          ) : (
            <SidebarLink to='#' onClick={showdropBox}>{currentUser.username}</SidebarLink>
          )}
          { dropBox ? (
            role === 1 ? (
              <div className="modal">
                <SidebarTitleLabel>
                    <Link className={classes.pointLink} to='/myaccount'>
                      <span style={{fontWeight: 'normal'}}>Signed in as</span> {currentUser.username}
                    </Link>
                </SidebarTitleLabel>
                <SidebarTitleLabel>Available</SidebarTitleLabel>
                <SidebarLabel>Total &nbsp;&nbsp; {currentUser.total}</SidebarLabel>
                <SidebarTitleLabel>
                  <Link className={classes.pointLink} to='/' onClick={logout}>
                    Sign Out
                  </Link>
                </SidebarTitleLabel>
              </div>           
            ) : (
              role === 2 ? (
                <div className="modal">
                  <SidebarTitleLabel>
                    <Link className={classes.pointLink} to='/myaccount'>
                      <span style={{fontWeight: 'normal'}}>Signed in as</span> {currentUser.username}
                    </Link>
                  </SidebarTitleLabel>
                  <SidebarTitleLabel>Level</SidebarTitleLabel>
                  <SidebarLabel>{levelIcon} {currentUser.level}</SidebarLabel>
                  <SidebarTitleLabel>Donation</SidebarTitleLabel>
                  <SidebarLabel>Panty Liner {currentUser.liner}</SidebarLabel>
                  <SidebarLabel>Medium {currentUser.medium}</SidebarLabel>
                  <SidebarLabel>Large {currentUser.large}</SidebarLabel>
                  <SidebarLabel>Overnight {currentUser.overnight}</SidebarLabel>
                  <SidebarTitleLabel>
                    <Link className={classes.pointLink} to='/' onClick={logout}>
                      Sign Out
                    </Link>
                  </SidebarTitleLabel>
                </div>           
              ) : null )
          ) : null }
        </SidebarWrap>
      </SidebarNav>
      <Backdrop className={classes.backdrop} open={sidebar} />
    </>
  );
};

export default Sidebar;
