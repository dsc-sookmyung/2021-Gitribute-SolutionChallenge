import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  outerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "999",
    backgroundColor: "#9c27b0",
    width: "100vw",
    height: "100vh",
    padding: "0rem calc((100vw - 1194px) / 2)"
  },
  innerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    backgroundColor: "#fff",
    width: "80vw",
    height: "76%",
    padding: "1.5rem",
    justifyContent: "center",
  },
  margin: {
    marginTop: "1rem",
    marginBottom: "2rem",
    textAlign: "center"
  }
}));

export default function JoinSuccess(props) {
  const classes = useStyles();

  const goCenter = () => {
    props.history.push("/login");
  }

  return (
      <div className={classes.container}>
        <div className={classes.outerBox}>
          <div className={classes.innerBox}>
            <CheckCircleIcon style={{ fontSize: 160 }} color="secondary" />
            <div className={classes.margin}>
            <Typography variant="h3">Verified!</Typography>
            <div>You have successfully verfied account.</div>
            </div>
            <Button variant="contained" color="secondary" onClick={goCenter}>
              Blooming Sign In
            </Button>
          </div>
        </div>
      </div>
  );
}
