import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import round_account from '../../assets/images/round_account_circle.png';
import round_person from '../../assets/images/round_person.png';
import Home from './Home';
import Privacy from './Privacy';
import Account from './Account';

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    backgroundColor: "#fff",
    padding: "6.5rem calc((100vw - 1193px) / 2 + 1rem)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    '@media screen and (max-width: 1193px)': {
      padding: "6.5rem 1rem"
    },
    '@media screen and (max-width:767px)': {
      padding: "6.5rem 2rem",
      flexDirection: "column"
    },
  },
  accountTitle: {
    width: "20rem",
    paddingBottom: "2rem"
  },
  profileImg: {
      borderRadius: "160px",
      border: "1px solid black"
  },
  profileText: {
      height: "100%"
  },
  menu: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  activeContent: {
    paddingTop: theme.spacing(3)
  }
}));

export default function AccountManager() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("USER");
  const [levelIcon, setLevelIcon] = useState("🌱");
  const [star, setStar] = useState(undefined);
  const [active, setActive] = useState("home");
  const classes = useStyles();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
        setCurrentUser(user);
        setRole(user.role);
        setUsername(user.username);
        
        if (user.center) {
          setStar(user.center);
        }
  
        if (user.level) {
          user.level <= 10 ? (
            setLevelIcon("🌱")
          ) : (
            user.level < 30 ? (
              setLevelIcon("☘")
            ) : (
              user.level < 50 ? (
                setLevelIcon("🍀")
              ) : (
                  setLevelIcon("🌼")
              )
            )
          )
        }
      }
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(currentUser));
  }, [currentUser]);

  const handleToggleChange = (e, newActive) => {
    setActive(newActive);
  }

  return (
    <div className={classes.container}>
      <Grid container className={classes.accountTitle} spacing={2}>
        <Grid item xs={3}>
            <img className={classes.profileImg} src={round_person} />
        </Grid>
        <Grid item xs={9}>
            <Grid className={classes.profileText} item container direction="column" justify="center">
                <Grid item>
                <Typography variant="h3">
                    Username
                </Typography>
                </Grid>
                <Grid item>
                <div>
                    Your personal account
                </div>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.select}>
        <ToggleButtonGroup value={active} onChange={handleToggleChange} exclusive="true" size="small">
            <ToggleButton value="home">
              Home
            </ToggleButton>
            <ToggleButton value="privacy">
              Privacy
            </ToggleButton>
            <ToggleButton value="account">
              Account    
            </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <div className={classes.activeContent}>
        {
        active === "privacy" ? <Privacy user={currentUser}/> :
        active === "account" ? <Account user={currentUser}/> : <Home user={currentUser}/>
        }
    </div>
    </div>
  );
}
