import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Checkbox, FormControlLabel, Input, Button, ButtonGroup } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  label: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  input: {
    width: "3rem",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function CenterInfo() {
  const [checkedType, setCheckedType] = useState([]);
  const [linerCounter, setLinerCounter] = useState(0);
  const [mediumCounter, setMediumCounter] = useState(0);
  const [largeCounter, setLargeCounter] = useState(0);
  const [overnightCounter, setOvernightCounter] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    console.log(checkedType);
  }, [checkedType, linerCounter, mediumCounter, largeCounter, overnightCounter]);

  const handlePadType = ((e) => {
    setCheckedType({...checkedType, [e.target.name] : e.target.checked });
  });

  const handleLinerIncrement = () => {
    setLinerCounter(prevLinerCounter => prevLinerCounter + 1);
  }

  const handleMediumIncrement = () => {
    setMediumCounter(prevMediumCounter => prevMediumCounter + 1);
  }

  const handleLargeIncrement = () => {
    setLargeCounter(prevLargeCounter => prevLargeCounter + 1)
  }

  const handleOvernightIncrement = () => {
    setOvernightCounter(prevOvernightCounter => prevOvernightCounter + 1)
  }

  const handleLinerDecrement = () => {
    setLinerCounter(prevLinerCounter => prevLinerCounter - 1);
  }

  const handleMediumDecrement = () => {
    setMediumCounter(prevMediumCounter => prevMediumCounter - 1);
  }

  const handleLargeDecrement = () => {
    setLargeCounter(prevLargeCounter => prevLargeCounter - 1)
  }

  const handleOvernightDecrement = () => {
    setOvernightCounter(prevOvernightCounter => prevOvernightCounter - 1)
  }

  const handleSubmit = () => {

  }

  return (
    <Container>
      <strong>❤ Choose the types of sanitary pad you want to take</strong>
      <Grid container className={classes.select}>
        <Grid item xs={6}> 
          <FormControlLabel
            control={<Checkbox name="liner" onChange={handlePadType} color="secondary" />}
            label={<Typography variant="body2">Panty Liner</Typography>}
          />
        </Grid>
        <Grid item xs={6}> 
          <FormControlLabel
            control={<Checkbox name="medium" onChange={handlePadType} color="secondary" />}
            label={<Typography variant="body2">Medium</Typography>}
          />
        </Grid>
        <Grid item xs={6}> 
          <FormControlLabel
            control={<Checkbox name="large" onChange={handlePadType} color="secondary" />}
            label={<Typography variant="body2">Large</Typography>}
          />
        </Grid>
        <Grid item xs={6}> 
          <FormControlLabel
            control={<Checkbox name="overnight" onChange={handlePadType} color="secondary" />}
            label={<Typography variant="body2">Overnight</Typography>}
          />
        </Grid>
      </Grid>
      <strong>👀 Enter the original number and the number you want to take</strong>
      <Grid container className={classes.select}>
        <Grid item xs={6}> 
          <Typography className={classes.label} variant="body2">Panty Liner</Typography>
          <Input 
            className={classes.input}
            type="number" />
          <ButtonGroup size="small">
            { linerCounter > 0 ? (
              <Button onClick={handleLinerDecrement}>-</Button>
            ) : (
              <Button disabled>-</Button>
            )}
            <Button disabled>{linerCounter}</Button>
            <Button onClick={handleLinerIncrement}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}> 
          <Typography className={classes.label} variant="body2">Medium</Typography>
          <Input 
            className={classes.input}
            type="number" />
          <ButtonGroup size="small">
            { mediumCounter > 0 ? (
              <Button onClick={handleMediumDecrement}>-</Button>
            ) : (
              <Button disabled>-</Button>
            )}
            <Button disabled>{mediumCounter}</Button>
            <Button onClick={handleMediumIncrement}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}> 
          <Typography className={classes.label} variant="body2">Large</Typography>
          <Input 
            className={classes.input}
            type="number" />
          <ButtonGroup size="small">
            { largeCounter > 0 ? (
              <Button onClick={handleLargeDecrement}>-</Button>
            ) : (
              <Button disabled>-</Button>
            )}
            <Button disabled>{largeCounter}</Button>
            <Button onClick={handleLargeIncrement}>+</Button>
          </ButtonGroup>
        </Grid><Grid item xs={6}> 
          <Typography className={classes.label} variant="body2">Overnight</Typography>
          <Input 
            className={classes.input}
            type="number" />
          <ButtonGroup size="small">
            { overnightCounter > 0 ? (
              <Button onClick={handleOvernightDecrement}>-</Button>
            ) : (
              <Button disabled>-</Button>
            )}
            <Button disabled>{overnightCounter}</Button>
            <Button onClick={handleOvernightIncrement}>+</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      
      <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          size="small"
          className={classes.submit}
        >
        Submit
        </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 1193px) {
    // padding: 2.5rem 1rem;
  }
`;
