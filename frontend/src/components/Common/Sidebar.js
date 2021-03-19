import React, { useState } from 'react';
import { NavIcon, SidebarNav, SidebarWrap, SidebarLink, SidebarTitleLabel, SidebarLabel } from './SidebarElements';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { BarData } from './BarData';

const Sidebar = ({ role, currentUser, logout, levelIcon, star }) => {
  const [sidebar, setSidebar] = useState(false);
  const [dropBox, setDropBox] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showdropBox = () => setDropBox(!dropBox);

  return (
    <>
      <MenuIcon onClick={showSidebar} fontSize="large" style={{ color: "000" }} />
      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon to='#'>
            <CloseIcon onClick={showSidebar} color="secondary"/>
          </NavIcon>
          <SidebarLink to='/' activeStyle>About</SidebarLink>
          <SidebarLink to='/center' activeStyle>{!star ? ("Choose your local LOGO Center") : ("Primary Center: 📍"+star)}</SidebarLink>
          <SidebarLink to='/faq' activeStyle>FAQ</SidebarLink>
          <SidebarLink to='/contact' activeStyle>Contact</SidebarLink>
          { role === 0 ? (
            <SidebarLink to='/login' activeStyle>Sign&nbsp;In</SidebarLink>
          ) : (
            <SidebarLink to='#' onClick={showdropBox} activeStyle>{currentUser.username}</SidebarLink>
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
    </>
  );
};

export default Sidebar;
