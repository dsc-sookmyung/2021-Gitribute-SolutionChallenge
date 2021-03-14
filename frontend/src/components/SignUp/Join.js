import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/Auth';
import { createMessage } from '../../actions/Messages';

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

const Join = ({ isAuthenticated }) => {
  const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
  const classes = useStyles();
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [usernameCheck, setusernameCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  const joinRecipient = (e) => {
    e.preventDefault();
    setRole(1);
  }

  const joinDonor = (e) => {
    e.preventDefault();
    setRole(2);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      createMessage({ passwordNotMatch: 'Passwords do not match' });
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      register(newUser);
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  
  const handleUsername = (e) => {
    alert(e.target.value);
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
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
            <Controller
              name="username"
              as={
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoComplete="uname"
                helperText={fieldsErrors.username ? fieldsErrors.username.message : null}
                error={fieldsErrors.username}
                value={username}
                onChange={([ e ]) => {
                  handleUsername(e);
                  return e.target.value;
                }}
                />  
              }
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: {
                  value: /^(?=[a-zA-Z0-9._]{2,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                  message: 'invalid username'
                }
              }}
            />
            <Controller
              name="email"
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                  error={fieldsErrors.email}
                  value={email}
                  onChange={([ e ]) => {
                    handleEmail(e);
                    return e.target.value;
                  }}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'invalid email address'
                }
              }}
            />
            <Controller
              name="password"
              as={                
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
                  onChange={([ e ]) => {
                    handlePassword(e);
                    return e.target.value;
                  }}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: 'Required'
              }}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Join);
