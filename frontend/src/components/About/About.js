import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import image from '../../assets/images/high-five.png';
import createSpacing from '@material-ui/core/styles/createSpacing';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#fff",
    height: "100vh",
    padding: "2.5rem calc((100vw - 1193px) / 2 + 1rem)",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-around",
    '@media screen and (max-width: 1193px)': {
      padding: "2.5rem 1rem"
    },
    '@media screen and (max-width:767px)': {
      padding: "2.5rem 2rem",
      flexDirection: "column"
    },
  },
  about: {
    marginRight: "auto",
    alignSelf: "center",
    '@media (max-width:767px)': {
      display: "flex",
      flexDirection: "column",
      alignSelf: "flex-start",
      paddingBottom: "4rem"
    }
  },
  imageContainer: {
    alignSelf: "center",
    width: "400px",
    '@media (max-width:767px)': {
      width: "260px"
    }
  }
}))

const About = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.about}>
        <Typography variant="h1">Until the day you <span style={{color: "#9c27b0"}}>bloom</span></Typography>
        <Typography variant="body3">&nbsp;</Typography>
        <Typography variant="body1">description</Typography>
      </div>
      <img className={classes.imageContainer} src={image} width="auto" />
    </div>
  );
}

export default About;
