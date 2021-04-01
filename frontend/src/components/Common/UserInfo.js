import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    padding: "1rem 1rem"
  },
  content: {
    padding: "0.5rem 1rem"
  }
}));

const UserInfo = ({ trigger, currentUser, logout, levelIcon }) => {
  const [userInfo, setUserInfo] = useState(currentUser);
  const classes = useStyles();

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
            <div className={classes.title}>Available</div>
            <div className={classes.content}>Total &nbsp;&nbsp; {userInfo.total}</div>
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
            <a href="#" onClick={logout}><div className={classes.title}>Sign Out</div></a>
          </div>           
        ) : (
          userInfo.role === 2 ? (
            <div className="modal">
              <div className={classes.title}>Level</div>
              <div className={classes.content}>{levelIcon} {userInfo.level}</div>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <div className={classes.title}>Donation</div>
              <div className={classes.content}>Panty Liner {userInfo.liner}</div>
              <div className={classes.content}>Medium {userInfo.medium}</div>
              <div className={classes.content}>Large {userInfo.large}</div>
              <div className={classes.content}>Overnight {userInfo.overnight}</div>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
              <a href="#" onClick={logout}><div className={classes.title}>Sign Out</div></a>
            </div>           
          ) : null )}
        </>
      )}
    </Popup>
  );
};

export default UserInfo;
