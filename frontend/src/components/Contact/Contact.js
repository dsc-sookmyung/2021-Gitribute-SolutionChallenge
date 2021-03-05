import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Profile from './Profile';

import suhee from '../../Images/0hee0.jpg';
import eunji from '../../Images/heleneunji.jpg';
import jiyeon from '../../Images/hellouz818.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2.5rem calc((100vw - 1193px) / 2 + 1rem)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    '@media screen and (max-width: 1193px)': {
      padding: '2.5rem 1rem'
    },
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3)
  },
  profile: {
    paddingTop: theme.spacing(3),
    display: 'flex',
    jutifyContent: 'space-between',
    flexWrap: 'wrap',

    '@media only screen and (max-width: xs)': {
        width: '100%',
        margin: 0
    }
  },
  hr: {
    [theme.breakpoints.up('md')]: {
      width: "1194px",
    }, 
    width: "calc(100vw - 2rem)",
    border: "solid 0.1px #e9ecef", 
    transform: "scaleY(0.5)", 
  },
}))

const Contact = () => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.paper}>
      <Typography variant="h3" >
        Developers
      </Typography>
      <div className={classes.profile}>
        <Profile
          name={"서희"}
          email={"suhee0206@gmail.com"}
          image={suhee}
          github={"0hee0"}
          role={"front-end"}
        />
        <Profile 
          name={"권은지"}
          email={"email"}
          image={eunji}
          github={"heleneunji"}
          role={"back-end"} 
        />
        <Profile 
          name={"유지연"}
          email={"email"}
          image={jiyeon}
          github={"hellouz818"}
          role={"back-end"}
        />
      </div>
      <hr className={classes.hr} />
      <Typography variant="h3" className={classes.title}>
        Contact Us
      </Typography>
      ✉ &nbsp; <strong>Email</strong> <br/ >
      sookmyung.ac.kr
    </Container>
  );
}

export default Contact;
