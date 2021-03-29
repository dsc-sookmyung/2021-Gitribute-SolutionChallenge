import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "90vw",
    width: "36vw",
    zIndex: "99",
    background: "#fff",
    boxShadow: "5px 5px 3px 3px rgba(0, 0, 0, 0.1)",
    border: "2px solid rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2, 2)
  },
  title: {
  },
  content: {
    padding: theme.spacing(3, 0)
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  ok: {
    marginTop: theme.spacing(2),
  },
}))

const CustomAlert = ({ title, content, close }) => {
  const classes = useStyles();

  return(
    <>
      <div className={classes.modal}>
        <Typography variant="h3" className={classes.title}>{title}</Typography>
        <div className={classes.content}> {content} </div>
        <div className={classes.button}>
          <Button 
            className={classes.ok}
            onClick={close}
            size="small"
            variant="contained"
            color="secondary"
          >
            OK
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomAlert;
