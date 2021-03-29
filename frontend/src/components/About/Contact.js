import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Profile from './Profile';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import suhee from '../../assets/images/0hee0.jpg';
import eunji from '../../assets/images/heleneunji.jpg';
import jiyeon from '../../assets/images/hellouz818.png';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "2.5rem 0rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    '@media screen and (max-width: 1193px)': {
      padding: "2.5rem 0rem"
    },
    '@media screen and (max-width:767px)': {
      padding: "2.5rem 0rem",
      flexDirection: "column"
    },
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3)
  },
  profile: {
    marginTop: theme.spacing(3),
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
    margin: theme.spacing(2, 0)
  },
}))

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3" >
        Developers
      </Typography>
      <div className={classes.profile}>
        <Profile
          name={"Suh Hee"}
          email={"suhee0206@gmail.com"}
          image={suhee}
          github={"0hee0"}
          role={"front-end"}
        />
        <Profile 
          name={"Kwon Eunji"}
          email={"heleneunji@gmail.com"}
          image={eunji}
          github={"heleneunji"}
          role={"back-end"} 
        />
        <Profile 
          name={"Yoo Jiyeon"}
          email={"hellouz818@gmail.com"}
          image={jiyeon}
          github={"hellouz818"}
          role={"back-end"}
        />
      </div>
      <hr className={classes.hr} />
      <Typography variant="h3" className={classes.title}>
        Contact Us
      </Typography>
      <FormControlLabel
        control={<a 
          target="_blank" 
          href="https://forms.gle/cXMVQLwAEEhsUoaf9"
          style={{ 
            backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Forms_2020_Logo.svg/1200px-Google_Forms_2020_Logo.svg.png")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: "4rem", height: "6rem" }} />}
        label="🔗 Form"
        labelPlacement="top"
      />
    </div>
  );
}

export default Contact;
