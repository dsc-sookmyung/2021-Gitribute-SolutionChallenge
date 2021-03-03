import React, { useState } from 'react';
import { NavIcon, SidebarNav, SidebarWrap, SidebarLink } from './SidebarElements';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { BarData } from './BarData';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <MenuIcon onClick={showSidebar} fontSize="large" />
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
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
