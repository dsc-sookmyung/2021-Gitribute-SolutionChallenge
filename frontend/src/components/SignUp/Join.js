import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CustomPopup from '../Common/CustomPopup';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  slogan: {
    marginTop: theme.spacing(30),
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(12)
  },
  input: {
    display: 'none'
  }
}));

export default function Join() {
  const classes = useStyles();
  const [role, setRole] = useState(0);

  const joinRecipient = (e) => {
    e.preventDefault();
    setRole(1);
  }

  const joinDonor = (e) => {
    e.preventDefault();
    setRole(2);
  }

  return (
    <Container component="main" maxWidth="xs">
      { !role ? (
        <>
          <div className={classes.slogan}>
            <Typography variant="h1">
              Our Slogan ...
            </Typography>
          </div>
          <div className={classes.button}>
            <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={joinRecipient}
            >
              Register &nbsp; <strong>TODAY</strong> &nbsp; to be a &nbsp; <strong>recipient</strong>
            </Button>
          </div>
          <div className={classes.button}>
            <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={joinDonor}
            >
              Register &nbsp; <strong>TODAY</strong> &nbsp; to be a &nbsp; <strong>donor</strong>
            </Button>
          </div>
        </>
      ) : (
        <div className={classes.paper}>
          { role === 1 ? (
            <Typography variant="body1">
              Join LOGO as a Recipient
            </Typography>
          ) : (
            <Typography variant="body1">
              Join LOGO as a Donor
            </Typography>
          )}
          <Typography variant="h1">
            Create Account
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="uname"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            { role === 1 ? (
              <div className={classes.button}>
                <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload Certificate
                  </Button>
                </label>
                <CustomPopup 
                  trigger={
                    <IconButton color="primary" aria-label="help">
                      <HelpOutlineIcon />
                    </IconButton>} 
                  title="help" 
                  content="help ..." 
                />
              </div>
            ) : ( null ) }
            <FormControlLabel
              control={<Checkbox value="agreeTerms" color="secondary" />}
              label={<div>I Agree to &nbsp;
                <CustomPopup 
                  trigger="The Terms & Conditions"
                  title="The Terms & Conditions"
                  content="About terms and conditions"
                />
                </div>}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
}
