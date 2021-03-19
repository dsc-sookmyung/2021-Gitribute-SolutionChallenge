import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';
import CenterTable from './CenterTable';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
  },
  table: {
    maxWidth: "1194px",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
  },
}));

export default function CenterInfo() {
  const [role, setRole] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [star, setStar] = useState(undefined);
  const [region, setRegion] = useState("전체");
  const [centerNames, setCenterNames] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setRole(user.role);
      
      if (user.center) {
        setStar(user.center);
      }
    }

    setCenterNames(UserService.getDefaultCenter(region));
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    setCenterNames(UserService.getDefaultCenter(region));
  }, [region]);

  const changeRegion = (e) => {
    setRegion(e.target.value);
  }

  return (
    <Container>
      <Typography variant="h3">
        Search by location
      </Typography>
      <Grid container className={classes.select}>
        <FormControl component="fieldset">
        <RadioGroup 
          defaultValue="전체"
          row aria-label="location" 
          onChange={changeRegion}
          className={classes.radio}  
        >
          <Grid item xs={6} sm={3}>
          <FormControlLabel
            value="전체"
            control={<Radio />}
            label="전체"
          />
          </Grid>
          <Grid item xs={6} sm={3}>
          <FormControlLabel
            value="서울" 
            control={<Radio />}
            label="서울"
          />
          </Grid>
          <Grid item xs={6} sm={3}>
          <FormControlLabel
            value="경기/인천" 
            control={<Radio />}
            label="경기/인천"
          />
          </Grid>
          <Grid item xs={6} sm={3}>
          <FormControlLabel
            value="충남/세종/대전/강원" 
            control={<Radio />}
            label="충남/세종/대전/강원"
          />
          </Grid>
          <Grid item xs={6} sm={3}>
          <FormControlLabel
            value="전라/광주" 
            control={<Radio />}
            label="전라/광주"
          />
          </Grid>
          <Grid item xs={6} sm={3}>
          <FormControlLabel
            value="경상/대구/부산/울산" 
            control={<Radio />}
            label="경상/대구/부산/울산"
          />
          </Grid>
          <Grid item xs={6} sm={3}>
          <FormControlLabel
            value="제주" 
            control={<Radio />}
            label="제주"
          />
          </Grid>
          <Grid item xs={6} sm={3}>
          <FormControlLabel 
            value="disabled" 
            disabled control={<Radio />} 
            label="지원하지 않는 지역" />
          </Grid>
        </RadioGroup>
        </FormControl>
      </Grid>
      <CenterTable className={classes.table} role={role} region={region} star={star} centerNames={centerNames} />
    </Container>
  );
}

const Container = styled.div`
  padding: 2.5rem calc((100vw - 1193px) / 2 + 1rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 1193px) {
    padding: 2.5rem 1rem;
  }
`;