import React, { useState } from 'react';
import { NavIcon, SidebarNav, SidebarWrap, SidebarLink, SidebarTitleLabel, SidebarLabel } from './SidebarElements';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: '#fff',
  },
  menu: {
    // margin: "0.5rem"
  }
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
          { role === 0 ? (
            <SidebarLink to='/login'>Sign&nbsp;In</SidebarLink>
          ) : (
            <SidebarLink to='#' onClick={showdropBox}>{currentUser.username}</SidebarLink>
          )}
          { dropBox ? (
            role === 1 ? (
              <div className="modal">
                <SidebarTitleLabel>Available</SidebarTitleLabel>
                <SidebarLabel>Total &nbsp;&nbsp; {currentUser.total}</SidebarLabel>
                <SidebarTitleLabel><a href="#" onClick={logout}>Sign Out</a></SidebarTitleLabel>
              </div>           
            ) : (
              role === 2 ? (
                <div className="modal">
                  <SidebarTitleLabel>Level</SidebarTitleLabel>
                  <SidebarLabel>{levelIcon} {currentUser.level}</SidebarLabel>
                  <SidebarTitleLabel>Donation</SidebarTitleLabel>
                  <SidebarLabel>Panty Liner {currentUser.liner}</SidebarLabel>
                  <SidebarLabel>Medium {currentUser.medium}</SidebarLabel>
                  <SidebarLabel>Large {currentUser.large}</SidebarLabel>
                  <SidebarLabel>Overnight {currentUser.overnight}</SidebarLabel>
                  <SidebarTitleLabel><a href="#" onClick={logout}>Sign Out</a></SidebarTitleLabel>
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
