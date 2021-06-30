import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import round_person from '../../assets/images/round_person.png';
import Home from './Home';
import PersonalInfo from './PersonalInfo';
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

export default function AccountManager({ handleUpdate }) {
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
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
        setRole(currentUser.role);
        setUsername(currentUser.username);
        
        if (currentUser.center) {
          setStar(currentUser.center);
        }
  
        if (currentUser.total) {
          currentUser.total >= 120 ? setLevelIcon("🦋") :
          currentUser.total >= 110 ? setLevelIcon("🌼🌼🌼") :
          currentUser.total >= 100 ? setLevelIcon("🌼🌼") :
          currentUser.total >= 90 ? setLevelIcon("🌼") :
          currentUser.total >= 80 ? setLevelIcon("🍀🍀🍀") : 
          currentUser.total >= 70 ? setLevelIcon("🍀🍀") :
          currentUser.total >= 60 ? setLevelIcon("🍀") :
          currentUser.total >= 50 ? setLevelIcon("🌿🌿🌿") :
          currentUser.total >= 40 ? setLevelIcon("🌿🌿") :
          currentUser.total >= 30 ? setLevelIcon("🌿") :
          currentUser.total >= 20 ? setLevelIcon("🌱🌱🌱") :
          currentUser.total >= 10 ? setLevelIcon("🌱🌱") : setLevelIcon("🌱")
        }
      }
  }, [currentUser]);

  useEffect(() => {
    // console.log(username);
  }, [username]);

  const handleToggleChange = (e, newActive) => {
    setActive(newActive);
  }

  const updateUserInfo = async () => {
    await UserService.getUserInfo();
    handleUpdate();

    const user = await AuthService.getCurrentUser();

    if (user) {
        setCurrentUser(user);
    }
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
                    {username}
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
            <ToggleButton value="personal-info">
              Personal Info
            </ToggleButton>
            <ToggleButton value="account">
              Account    
            </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <div className={classes.activeContent}>
        {
        active === "personal-info" ? <PersonalInfo updateUserInfo={updateUserInfo}/> :
        active === "account" ? <Account /> : <Home currentUser={currentUser} levelIcon={levelIcon} />
        }
    </div>
    </div>
  );
}
