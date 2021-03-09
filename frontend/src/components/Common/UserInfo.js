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

const UserInfo = ({ trigger, role, userName }) => (
  <>
    <Popup
      trigger={<a href="#">{trigger}</a>}
      modal
      contentStyle={contentStyle}
    >
      {close => (
        <>
        { role === 1 ? (
          <div className="modal">
            <Title>Available</Title>
            <Content>Total &nbsp;&nbsp; 8</Content>
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
            <Title>Sign Out</Title>
          </div>           
        ) : (
          role === 2 ? (
            <div className="modal">
              <Title>Level</Title>
              <Content>🌱 7</Content>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <Title>Donation</Title>
              <Content>Panty Liner 3</Content>
              <Content>Medium 1</Content>
              <Content>Large 2</Content>
              <Content>Overnight 1</Content>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <Title>Sign Out</Title>
            </div>           
          ) : null )}
        </>
      )}
    </Popup>
  </>
);

export default UserInfo;

const Title = styled.div`
  font-weight: bold;
  padding: 1rem 1rem;
`;

const Content = styled.div`
  padding: 0.5rem 1rem;
`;
