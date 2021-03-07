import React from 'react';
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
  const classes = useStyles();

  const changeLocation = (e) => {
    e.preventDefault();
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
          onChange={changeLocation}
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
      <CenterTable className={classes.table} />
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