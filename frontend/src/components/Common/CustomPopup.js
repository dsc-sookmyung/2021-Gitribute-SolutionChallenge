import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

const contentStyle = {
  maxWidth: "90vw",
  width: "50vw",
  background: "#fff",
};

const useStyles = makeStyles((theme) => ({
  background: {
    zIndex: "-1",
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "auto",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  top: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    marginTop: theme.spacing(3)
  },
  title: {
    flex: "0 1 auto",
    position: "absolute",
    marginRight: "auto",
    marginLeft: "2rem"
  },
  close: {
    flex: "0 1 auto",
    marginLeft: "auto",
  },
  content: {
    padding: "2rem"
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  ok: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}))

const CustomPopup = ({ trigger, title, content }) => {
  const classes = useStyles();

  return(
    <Popup
      trigger={<a href="#">{trigger}</a>}
      modal
      contentStyle={contentStyle}
    >
      {close => (
        <>
        <div className={classes.background} />
        <div className="modal">
          <div className={classes.top}>
            <Typography variant="h3" className={classes.title}>{title}</Typography>
            <a className={classes.close} onClick={close}>
              <Button 
                color="secondary" 
                variant="text"
                size="large"
                >
                  &times;
              </Button>
            </a>
          </div>
          <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
          <div className={classes.content}> {content} </div>
          <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "90%"}} />
          <div className={classes.button}>
            <Button 
              className={classes.ok}
              onClick={() => { close(); }}
              size="small"
              variant="contained"
              color="secondary"
            >
              OK
            </Button>
          </div>
        </div>
        </>
      )}
    </Popup>
  );
};

export default CustomPopup;
