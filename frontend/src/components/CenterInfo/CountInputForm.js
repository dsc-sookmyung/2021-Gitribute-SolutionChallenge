import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Checkbox, FormControlLabel, Input, Button, ButtonGroup, Tab } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import Popup from "reactjs-popup";
import CustomPopup from '../Common/CustomPopup';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    '@media screen and (max-width: 1193px)': {
      // padding: 2.5rem 1rem;
    }
  },
  select: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  label: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  input: {
    width: "4rem",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  popupTop: {
    display: "flex",
    marginTop: theme.spacing(3)
  },
  popupTitle: {
    flex: "0 1 auto",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)"
  },
  popupContent: {
    padding: "2rem"
  },
  popupButton: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3)
  },
  popupCancel: {
    marginLeft: "auto",
    marginRight: "1.5rem",
  },
  popupSubmit: {
    marginRight: "2rem"
  },
}));

const TableCell = withStyles({
  root: {
    borderBottom: "none"
  }
})(MuiTableCell);

const contentStyle = {
  maxWidth: "90vw",
  width: "34vw",
  background: "#fff",
  boxShadow: "3px 5px 5px 3px rgba(0, 0, 0, 0.1)"
};

export default function CountInputForm({ role, region, center }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [checkedType, setCheckedType] = useState([]);
  const [originalLiner, setOriginalLiner] = useState(0);
  const [originalMedium, setOriginalMedium] = useState(0);
  const [originalLarge, setOriginalLarge] = useState(0);
  const [originalOvernight, setOriginalOvernight] = useState(0);
  const [linerCounter, setLinerCounter] = useState(0);
  const [mediumCounter, setMediumCounter] = useState(0);
  const [largeCounter, setLargeCounter] = useState(0);
  const [overnightCounter, setOvernightCounter] = useState(0);
  const [limit, setLimit] = useState(false);
  const [updateMypage, setUpdateMypage] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      
      if (user.total) {
        setTotal(user.total);
      }
    }
  }, []);

  useEffect(() => {
    if (total) {
      const totalCounter = linerCounter + mediumCounter + largeCounter + overnightCounter;
      if (totalCounter > total) {
        setLimit(true);
        alert(`You have exceeded the number you can take!\nNumber of sanitary pads you can take: ${total}`);
      }  
    }
  }, [linerCounter, mediumCounter, largeCounter, overnightCounter]);

  const handlePadType = ((e) => {
    setCheckedType({...checkedType, [e.target.name] : e.target.checked });
  });

  const handleOriginalLiner = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setOriginalLiner(e.target.value);
  }

  const handleOriginalMedium = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setOriginalMedium(e.target.value);
  }

  const handleOriginalLarge = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setOriginalLarge(e.target.value);
  }

  const handleOriginalOvernight = (e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    setOriginalOvernight(e.target.value);
  }

  const handleLinerIncrement = () => {
    if (!limit) {
      setLinerCounter(prevLinerCounter => prevLinerCounter + 1);
    }
    setLimit(false);
  }

  const handleMediumIncrement = () => {
    if (!limit) {
      setMediumCounter(prevMediumCounter => prevMediumCounter + 1);
    }
    setLimit(false);
  }

  const handleLargeIncrement = () => {
    if (!limit) {
      setLargeCounter(prevLargeCounter => prevLargeCounter + 1);
    }
    setLimit(false);
  }

  const handleOvernightIncrement = () => {
    if (!limit) {
      setOvernightCounter(prevOvernightCounter => prevOvernightCounter + 1);
    }
    setLimit(false);
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
    const original = {
      originalLiner,
      originalMedium,
      originalLarge,
      originalOvernight
    };
    const padCount = {
      linerCounter,
      mediumCounter,
      largeCounter,
      overnightCounter
    };
    setUpdateMypage(UserService.padNumToMypage(linerCounter, mediumCounter, largeCounter, overnightCounter));
    UserService.padNumToCenter(region, center, 
      originalLiner, originalMedium, originalLarge, originalOvernight, 
      linerCounter, mediumCounter, largeCounter, overnightCounter);
  }

  useEffect(() => {
    if (updateMypage) {
      UserService.getUserInfo();
    }
    setUpdateMypage(false);
  }, [updateMypage])

  return (
    <div className={classes.container}>
      { role === 2 ? (
        <strong>❤ Choose the types of sanitary pad you brought</strong>
      ) : (
        <strong>❤ Choose the types of sanitary pad you want to take</strong>
      )}
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
      { role === 2 ? (
        <strong>👀 Enter the original number and the number you brought</strong>
      ) : (
        <strong>👀 Enter the original number and the number you want to take</strong>
      )}
      <Grid container className={classes.select}>
        { checkedType["liner"] ? (
          <Grid item xs={12} sm={6}> 
            <Typography className={classes.label} variant="body2">Panty Liner</Typography>
            <Input 
              className={classes.input}
              type="number"
              onChange={handleOriginalLiner}
              placeholder="original" />
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
        ) : null }
        { checkedType["medium"] ? (
        <Grid item xs={12} sm={6}> 
          <Typography className={classes.label} variant="body2">Medium</Typography>
          <Input 
            className={classes.input}
            type="number" 
            onChange={handleOriginalMedium} 
            placeholder="original" />
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
        ) : null }
        { checkedType["large"] ? (
        <Grid item xs={12} sm={6}> 
          <Typography className={classes.label} variant="body2">Large</Typography>
          <Input 
            className={classes.input}
            type="number" 
            onChange={handleOriginalLarge}
            placeholder="original" />
          <ButtonGroup size="small">
            { largeCounter > 0 ? (
              <Button onClick={handleLargeDecrement}>-</Button>
            ) : (
              <Button disabled>-</Button>
            )}
            <Button disabled>{largeCounter}</Button>
            <Button onClick={handleLargeIncrement}>+</Button>
          </ButtonGroup>
        </Grid>
        ) : null }
        { checkedType["overnight"] ? (
        <Grid item xs={12} sm={6}> 
          <Typography className={classes.label} variant="body2">Overnight</Typography>
          <Input 
            className={classes.input}
            type="number" 
            onChange={handleOriginalOvernight}
            placeholder="original" />
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
        ) : null }  
        </Grid>    
        <Popup
        trigger={
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="small"
            className={classes.submit}
          >
            Submit
          </Button>
        }
        modal
        contentStyle={contentStyle}
        >
          {close => (
            <>
            <div className={classes.popupTop}>
              <Typography variant="h3" className={classes.popupTitle}>Are you sure?</Typography>
            </div>
            <div className={classes.popupContent}>
              <Table>
                <TableHead>
                  <TableRow>
                    <MuiTableCell>Type</MuiTableCell>
                    <MuiTableCell>Previous</MuiTableCell>
                    <MuiTableCell>You</MuiTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkedType["liner"] ? (
                    <TableRow>
                      <TableCell>Panty Liner</TableCell>
                      <TableCell>{originalLiner}</TableCell>
                      <TableCell>{linerCounter}</TableCell>
                    </TableRow>
                  ) : null}
                  {checkedType["medium"] ? (
                    <TableRow>
                      <TableCell>Medium</TableCell>
                      <TableCell>{originalMedium}</TableCell>
                      <TableCell>{mediumCounter}</TableCell>
                    </TableRow>
                  ) : null}
                  {checkedType["large"] ? (
                    <TableRow>
                      <TableCell>Large</TableCell>
                      <TableCell>{originalLarge}</TableCell>
                      <TableCell>{largeCounter}</TableCell>
                    </TableRow>
                  ) : null}
                  {checkedType["overnight"] ? (
                    <TableRow>
                      <TableCell>Overnight</TableCell>
                      <TableCell>{originalOvernight}</TableCell>
                      <TableCell>{overnightCounter}</TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </div>
            <div className={classes.popupButton}>
              <Button 
                className={classes.popupCancel}
                onClick={() => {close()}}
                size="small"
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button 
                className={classes.popupSubmit}
                onClick={() => {
                  handleSubmit(); 
                  close(); }}
                size="small"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </div>
            </>
          )}
        </Popup>
    </div>
  );
}
