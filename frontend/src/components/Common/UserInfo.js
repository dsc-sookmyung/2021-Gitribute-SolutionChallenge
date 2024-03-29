import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

const contentStyle = {
  position: "absolute",
  top: "4rem",
  right: "1rem",
  maxWidth: "50vw",
  width: "16rem",
  background: "#fff",
  boxShadow: "3px 3px 6px 1px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    padding: "1rem 1rem"
  },
  content: {
    padding: "0.5rem 1rem"
  },
  pointLink: {
    color: 'inherit', 
    textDecoration: 'inherit',
    fontWeight: 'bold'
  },
  contentLink: {
    padding: "1rem 1rem",
    '&:hover': {
      background: "#9c27b0",
      color: "white"
    },
  },
}));

const UserInfo = ({ trigger, currentUser, logout, levelIcon }) => {
  const classes = useStyles();

  useEffect(() => {

  }, [currentUser]);

  return (
    <Popup
      trigger={<a href="#">{trigger}</a>}
      modal
      contentStyle={contentStyle}
    >
      {close => (
        <>
        <Link className={classes.pointLink} to='/myaccount'>
          <div className={classes.contentLink}><span style={{fontWeight: 'normal'}}>Signed in as</span> {currentUser.username}</div>
        </Link>
        { currentUser.role === 1 ? (
          <div className="modal">
            <div className={classes.title}>Available</div>
            <div className={classes.content}>Total &nbsp;&nbsp; {currentUser.total}</div>
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
            <a href="/" onClick={logout}><div className={classes.title}>Sign Out</div></a>
          </div>           
        ) : (
          currentUser.role === 2 ? (
            <div className="modal">
              <div className={classes.title}>Level</div>
              <div className={classes.content}>{levelIcon}</div>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <div className={classes.title}>Donation</div>
              <div className={classes.content}>Panty Liner {currentUser.liner}</div>
              <div className={classes.content}>Medium {currentUser.medium}</div>
              <div className={classes.content}>Large {currentUser.large}</div>
              <div className={classes.content}>Overnight {currentUser.overnight}</div>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <Link className={classes.pointLink} to='/' onClick={logout}>
                <div className={classes.contentLink}>Sign Out</div>
              </Link>
            </div>           
          ) : null )}
        </>
      )}
    </Popup>
  );
};

export default UserInfo;
