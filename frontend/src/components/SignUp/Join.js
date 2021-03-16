import React, { useState } from 'react';
import AuthService from '../../services/auth.service';

import { useForm, Controller } from 'react-hook-form';
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

const Join = (props) => {
  const { handleSubmit, control, errors: fieldsErrors } = useForm();
  const classes = useStyles();
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const joinRecipient = (e) => {
    e.preventDefault();
    setRole(1);
  }

  const joinDonor = (e) => {
    e.preventDefault();
    setRole(2);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  /* NEED FIX */
  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onload = () => {
        setImage(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password, role, image).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
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
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="Username"
            autoComplete="uname"
            helperText={fieldsErrors.username ? fieldsErrors.username.message : null}
            error={fieldsErrors.username}
            value={username}
            onChange={handleUsername}
            />  
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
              error={fieldsErrors.email}
              value={email}
              onChange={handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
              error={fieldsErrors.password}
              value={password}
              onChange={handlePassword}
            />
            { role === 1 ? (
              <div className={classes.button}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleUpload}
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
            {message && (
              <div className="form-group">
                <div
                  className={ successful ? "alert alert-success" : "alert alert-danger" }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </Container>
  );
}

export default Join;
