import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FullPage, Slide } from 'react-full-page';
import FaceIcon from '@material-ui/icons/Face';
import PlaceIcon from '@material-ui/icons/Place';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import Contact from './Contact';
import RankTable from'./RankTable';
import image from '../../assets/images/high-five.png';
import certificate from '../../assets/images/certificate.png';
import '../../assets/fonts/fonts.css';

const useStyles = makeStyles((theme) => ({
  flexStartContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    [theme.breakpoints.down('xs')]: {
      overflow: "scroll"
    },
  },
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down('xs')]: {
      overflow: "scroll"
    },
  },
  bgWhite: {
    background: "#fff",
  },
  bgPurple: {
    background: "#9c27b0",
  },
  about: {
    padding: "2.5rem calc((100vw - 1193px) / 2 + 1rem)",
    margin: theme.spacing(8, 0),
    display: "flex",
    [theme.breakpoints.down('md')]: {
      padding: "2.5rem 1rem"
    },
    [theme.breakpoints.down('xs')]: {
      padding: "2.5rem 2rem",
      flexDirection: "column",
      alignSelf: "flex-start",
    },
  },
  headline: {
    marginRight: "2.5rem",
    alignSelf: "flex-end"
  },
  imageContainer: {
    marginLeft: "auto",
    alignSelf: "flex-start",
    width: "360px",
    [theme.breakpoints.down('xs')]: {
      display: "flex",
      alignSelf: "center",
      width: "260px",
      marginTop: "2.5rem"
    },
  },
  certificateContainer: {
    marginLeft: "auto",
    alignSelf: "flex-start",
    width: "720px",
    [theme.breakpoints.down('md')]: {
      width: "600px",
    },
    [theme.breakpoints.down('sm')]: {
      width: "520px",
    },
  },
  featureTop: {
    width: "100vw",
    height: "100vh",
    background: "#9c27b0",
    [theme.breakpoints.down('xs')]: {
      marginTop: "4rem"
    },
  }, 
  purpleContainer: {
    background: "#9c27b0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down('xs')]: {
      overflow: "scroll"
    },
  },
  columnContainer: {
    padding: "2.5rem calc((100vw - 1193px) / 2 + 1rem)",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down('md')]: {
      padding: "2rem 1rem"
    },
  },
  featureTitle: {
    color: "#fff", 
    fontFamily: "Lobster",
    justifyContent: "center",
    alignSelf: "center"
  },
  features: {
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "3rem",
  },
  feature: {
    padding: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "1rem"
  },
  featureHead: {
    margin: theme.spacing(2, 0)
  },
  featureDescription: {
    alignItems: "flex-start",
  },
  furtherExplanation: {
    background: "rgba(255, 255, 255, 0.8)",
    marginTop: "4rem",
    padding: theme.spacing(2, 1),
    border: "1px solid #fff",
    borderRadius: "6px"
  },
  contactTop: {
    width: "100vw",
    height: "100vh",
    background: "#fff",
  },
  contact: {
    alignItems: "flex-start",
  },
  largeIcon: {
    fontSize: "6rem",
  },
  fontBold: {
    fontWeight: 600,
  },
  rankInfo: {
    padding: "2.5rem calc((100vw - 1193px) / 2 + 1rem)",
    display: "flex",
    [theme.breakpoints.down('md')]: {
      padding: "2.5rem 1rem"
    },
    [theme.breakpoints.down('xs')]: {
      padding: "2.5rem 2rem",
      flexDirection: "column",
      alignSelf: "flex-start",
    },
  },
  levelTable: {
    marginLeft: "1rem",
    alignSelf: "flex-start"
  },
  rankingExplanation: {
    background: "rgba(255, 255, 255, 0.8)",
    marginTop: "1rem",
    padding: theme.spacing(2.45, 2),
    border: "1px solid #fff",
    borderRadius: "6px",
    width: "720px",
    alignSelf: "flex-end",
    [theme.breakpoints.down('md')]: {
      width: "600px",
    },
    [theme.breakpoints.down('sm')]: {
      width: "520px",
    },
  },
}))

const About = () => {
  const classes = useStyles();

  return (
    <FullPage>
      <Slide className={classes.flexStartContainer, classes.bgWhite}>
        <div className={classes.about}>
          <div className={classes.headline}>
            <Typography variant="h1">Until the day you <span style={{color: "#9c27b0"}}>bloom</span></Typography>
            <br />
            <Typography variant="body3">&nbsp;</Typography>
            <Typography variant="body1">
              Prevent female teenagers from suffering by lack of sanitary pads. <br />
              Protecting both donors and beneficiaries while exchanging menstrual supplies.
            </Typography>
          </div>
          <img className={classes.imageContainer} src={image} width="auto" />
        </div>
        <div className={classes.featureTop} />
      </Slide>
      <Slide className={classes.centerContainer, classes.bgPurple}>
        <div className={classes.columnContainer}>
          <Typography className={classes.featureTitle} variant="h1">Blooming</Typography>
          <Grid container className={classes.features}>
            <Grid item xs={12} sm={4} className={classes.feature}>
              <FaceIcon className={classes.largeIcon} />
              <Typography variant="h2" className={classes.featureHead}>Who</Typography>
              <div className={classes.featureDescription}>
                <Typography variant="body1">Who could use our service?</Typography>
                <Typography variant="body2">
                  Anyone can be a donor!<br />
                  However, the beneficiary is only for low-income girls.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.feature}>
              <PlaceIcon className={classes.largeIcon} />
              <Typography variant="h2" className={classes.featureHead}>Where</Typography>
              <div className={classes.featureDescription}>
                <Typography variant="body1">Where could you use our service?</Typography>
                <Typography variant="body2">
                  You can use sanitary pad boxes in the bathroom of a nearby subway station! 
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.feature}>
            <CheckCircleOutlineIcon className={classes.largeIcon} />
            <Typography variant="h2" className={classes.featureHead}>How</Typography>
            <div className={classes.featureDescription}>
              <Typography variant="body1">How could you use our service?</Typography>
              <Typography variant="body2">
              Log in and select the center to bring your sanitary pads. 
              Enter and submit the number of sanitary pads to take!
              </Typography>
            </div>
            </Grid>
          </Grid>
          <div className={classes.furtherExplanation}>
            <Typography variant="body2">
              🌼 Donors can just donate without logging in! 
              However if you donate 120 or more, you can get a certificate of donation, so we recommend using our service!
            </Typography>
          </div>
        </div>
      </Slide>
      <Slide className={classes.flexStartContainer, classes.bgPurple}>
        <div className={classes.rankInfo}>
          <div display="flex" flexDirection="column">
            <img className={classes.certificateContainer} src={certificate} width="auto" />
            <div className={classes.rankingExplanation} justifyContent="flex-end">
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "100%"}} />
                <Typography variant="body2">
                  <Box letterSpacing={2} m={1}>
                    Ranking is for donors only. 
                    Ranking points refer to the total number of sanitary pad donations. 
                    The more you donate, the higher your ranking goes. 
                    Once you reach your final ranking of Butterfly "🦋", 
                    you will receive a certificate of donation via the email you entered for your registration.
                    <br/><br/>
                    We hope you can have a donation ranking contest with other people and get a certificate!
                  </Box>
                </Typography>
              <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "100%"}} />
            </div>
          </div>
          <div className={classes.levelTable}>
            <RankTable />
          </div>
        </div>
      </Slide>
      <Slide className={classes.flexStartContainer, classes.bgWhite}>
        <div className={classes.columnContainer}>
        <div className={classes.contact}>
          <Contact />
        </div>
        </div>
      </Slide>
    </FullPage>
  );
}

export default About;
