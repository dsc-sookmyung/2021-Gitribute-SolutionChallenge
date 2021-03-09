import React, { useState } from 'react';
import { NavIcon, SidebarNav, SidebarWrap, SidebarLink, SidebarTitleLabel, SidebarLabel } from './SidebarElements';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { BarData } from './BarData';
import UserInfo from './UserInfo';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [role, setRole] = useState(2);
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
          {BarData.map((item, index) => {
            return (
            <SidebarLink to={item.path} key={index} activeStyle>
              {item.title}
            </SidebarLink>
            );
          })}
          { role === 0 ? (
            <SidebarLink to='/login' activeStyle>Sign&nbsp;In</SidebarLink>
          ) : (
            <SidebarLink to='#' onClick={showdropBox} activeStyle>User</SidebarLink>
          )}
          { dropBox ? (
            role === 1 ? (
              <div className="modal">
                <SidebarTitleLabel>Available</SidebarTitleLabel>
                <SidebarLabel>Total &nbsp;&nbsp; 8</SidebarLabel>
                <SidebarTitleLabel>Sign Out</SidebarTitleLabel>
              </div>           
            ) : (
              role === 2 ? (
                <div className="modal">
                  <SidebarTitleLabel>Level</SidebarTitleLabel>
                  <SidebarLabel>🌱 7</SidebarLabel>
                  <SidebarTitleLabel>Donation</SidebarTitleLabel>
                  <SidebarLabel>Panty Liner 3</SidebarLabel>
                  <SidebarLabel>Medium 1</SidebarLabel>
                  <SidebarLabel>Large 2</SidebarLabel>
                  <SidebarLabel>Overnight 1</SidebarLabel>
                  <SidebarTitleLabel>Sign Out</SidebarTitleLabel>
                </div>           
              ) : null )
          ) : null }
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
