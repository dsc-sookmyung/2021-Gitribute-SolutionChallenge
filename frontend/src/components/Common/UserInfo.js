import React from "react";
import styled from 'styled-components';
import Popup from "reactjs-popup";

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
  return (
    <Popup
      trigger={<a href="#">{trigger}</a>}
      modal
      contentStyle={contentStyle}
    >
      {close => (
        <>
        { currentUser.role === 1 ? (
          <div className="modal">
            <Title>Available</Title>
            <Content>Total &nbsp;&nbsp; {currentUser.total}</Content>
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
            <a href="#" onClick={logout}><Title>Sign Out</Title></a>
          </div>           
        ) : (
          currentUser.role === 2 ? (
            <div className="modal">
              <Title>Level</Title>
              <Content>{levelIcon} {currentUser.level}</Content>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <Title>Donation</Title>
              <Content>Panty Liner {currentUser.liner}</Content>
              <Content>Medium {currentUser.medium}</Content>
              <Content>Large {currentUser.large}</Content>
              <Content>Overnight {currentUser.overnight}</Content>
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
