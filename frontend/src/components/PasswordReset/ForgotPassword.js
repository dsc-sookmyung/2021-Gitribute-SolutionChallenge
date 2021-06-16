import React, { useState } from 'react';
import AuthService from '../../services/auth.service';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    background: "#fff",
    paddingTop: '2.5rem'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    marginTop: theme.spacing(5),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword(props) {
  const [email, setEmail] = useState();
  const classes = useStyles();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const resetEmail = () => {
    if (AuthService.resetEmail(email)) {
      alert("An email has been sent. Sign in with the password in your email and change your password on Mypage.")
      props.history.push("/login");
    }
    else {
      alert("Email sending failed. Please try again.");
    }
  }

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h1">
          Forgot your password?
        </Typography>
        <div className={classes.description}>
          <Typography variant="body2">
            Enter your user account's verified email address 
            and we will send you a password reset link.
          </Typography>
        </div>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmail}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onSubmit={resetEmail}
          >
            Send password reset email 
          </Button>
        </form>
      </div>
    </Container>
  );
}
