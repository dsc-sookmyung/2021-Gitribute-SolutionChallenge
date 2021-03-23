import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Popup from "reactjs-popup";
import AuthService from '../../services/auth.service';

const contentStyle = {
  position: "absolute",
  top: "4rem",
  right: "1rem",
  maxWidth: "50vw",
  width: "16rem",
  background: "#fff",
  boxShadow: "3px 3px 3px 1px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
};

const UserInfo = ({ trigger, currentUser, logout, levelIcon }) => {
  const [userInfo, setUserInfo] = useState(currentUser);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setUserInfo(user);
  }, []);

  return (
    <Popup
      trigger={<a href="#">{trigger}</a>}
      modal
      contentStyle={contentStyle}
    >
      {close => (
        <>
        { userInfo.role === 1 ? (
          <div className="modal">
            <Title>Available</Title>
            <Content>Total &nbsp;&nbsp; {userInfo.total}</Content>
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
            <a href="#" onClick={logout}><Title>Sign Out</Title></a>
          </div>           
        ) : (
          userInfo.role === 2 ? (
            <div className="modal">
              <Title>Level</Title>
              <Content>{levelIcon} {userInfo.level}</Content>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <Title>Donation</Title>
              <Content>Panty Liner {userInfo.liner}</Content>
              <Content>Medium {userInfo.medium}</Content>
              <Content>Large {userInfo.large}</Content>
              <Content>Overnight {userInfo.overnight}</Content>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <a href="#" onClick={logout}><Title>Sign Out</Title></a>
            </div>           
          ) : null )}
        </>
      )}
    </Popup>
  );
};

export default UserInfo;

const Title = styled.div`
  font-weight: bold;
  padding: 1rem 1rem;
`;

const Content = styled.div`
  padding: 0.5rem 1rem;
`;
