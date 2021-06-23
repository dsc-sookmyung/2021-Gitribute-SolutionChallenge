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
  popupNotice: {
    paddingTop: "2rem",
    color: "f5f5f5",
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

export default function CountInputForm({ role, region, centerInfo, handleUpdate }) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [checkedLiner, setCheckedLiner] = useState(false);
  const [checkedMedium, setCheckedMedium] = useState(false);
  const [checkedLarge, setCheckedLarge] = useState(false);
  const [checkedOvernight, setCheckedOvernight] = useState(false);
  const [checkedType, setCheckedType] = useState([]);
  const [originalLiner, setOriginalLiner] = useState(0);
  const [originalMedium, setOriginalMedium] = useState(0);
  const [originalLarge, setOriginalLarge] = useState(0);
  const [originalOvernight, setOriginalOvernight] = useState(0);
  const [linerCounter, setLinerCounter] = useState(0);
  const [mediumCounter, setMediumCounter] = useState(0);
  const [largeCounter, setLargeCounter] = useState(0);
  const [overnightCounter, setOvernightCounter] = useState(0);
  const [limitLiner, setLimitLiner] = useState(false);
  const [limitMedium, setLimitMedium] = useState(false);
  const [limitLarge, setLimitLarge] = useState(false);
  const [limitOvernight, setLimitOvernight] = useState(false);
  const [updateMypage, setUpdateMypage] = useState(false);
  const classes = useStyles();

  // alert("M:"+mediumCounter+"O:"+originalMedium+"C:"+centerInfo.pads.medium);
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
      if (totalCounter === total) {
        setLimitLiner(true);
        setLimitMedium(true);
        setLimitLarge(true);
        setLimitOvernight(true);
      }  
      else if (totalCounter > total) {
        // alert(`You have exceeded the number you can take!\nNumber of sanitary pads you can take: ${total}`);
      }

      if (linerCounter === centerInfo.pads.liner) {
        if (linerCounter > originalLiner) {
          setLimitLiner(true); 
        }
      } 
      else if (linerCounter > centerInfo.pads.liner) {
        if (linerCounter > originalLiner) {
          setLimitLiner(true); 
          console.log(`You have exceeded the number in the center!`); 
        }
      }
      else {
        setLimitLiner(false);
      }
  
      if (mediumCounter === centerInfo.pads.medium) {
        if (mediumCounter > originalMedium) {
          setLimitMedium(true); 
        }
      } 
      else if (mediumCounter > centerInfo.pads.medium) {
        if (mediumCounter > originalMedium) {
          setLimitLiner(true); 
          console.log(`You have exceeded the number in the center!`); 
        }
        else {
          setLimitMedium(true); 
        }
      }
      else {
        setLimitMedium(false);
      }
  
      if (largeCounter === centerInfo.pads.large) {
        if (largeCounter <= originalLarge) setLimitLarge(true); 
      } 
      else if (largeCounter > centerInfo.pads.large) {
        if (largeCounter > originalLarge) {
          setLimitLiner(true); 
          console.log(`You have exceeded the number in the center!`); 
        }
        else {
          setLimitLarge(true); 
        }
      }
      else {
        setLimitLarge(false);
      }
  
      if (overnightCounter === centerInfo.pads.overnight) {
        if (overnightCounter <= originalOvernight) setLimitOvernight(true); 
      } 
      else if (overnightCounter > centerInfo.pads.overnight) {
        if (overnightCounter > originalOvernight) {
          setLimitLiner(true); 
          console.log(`You have exceeded the number in the center!`); 
        }
        else {
          setLimitOvernight(true); 
        }
      }
      else {
        setLimitOvernight(false);
      }
    }
  }, [linerCounter, mediumCounter, largeCounter, overnightCounter]);

  useEffect(() => {
    console.log("use effect");
  }, [limitLiner, limitMedium, limitLarge, limitOvernight]);

  useEffect(() => {
    if (checkedLiner === false) {
      setLinerCounter(0);
      setOriginalLiner(0);
    }
  }, [checkedLiner]);

  useEffect(() => {
    if (checkedMedium === false) {
      setMediumCounter(0);
      setOriginalMedium(0);
    }
  }, [checkedMedium]);

  useEffect(() => {
    if (checkedLarge === false) {
      setLargeCounter(0);
      setOriginalLarge(0);
    }
  }, [checkedLarge]);

  useEffect(() => {
    if (checkedOvernight === false) {
      setOvernightCounter(0);
      setOriginalOvernight(0);
    }
  }, [checkedOvernight]);

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
    if (!limitLiner) {
      setLinerCounter(prevLinerCounter => prevLinerCounter + 1);
    }
    else {
      if (total === linerCounter) {
        alert(`You have exceeded the number you can take!\nNumber of sanitary pads you can take: ${total}`);
      }
      else {
        alert("You have exceeded the number in the center!");
      }    
    }
  }

  const handleMediumIncrement = () => {
    if (!limitMedium) {
      setMediumCounter(prevMediumCounter => prevMediumCounter + 1);
    }
    else {
      if (total === mediumCounter) {
        alert(`You have exceeded the number you can take!\nNumber of sanitary pads you can take: ${total}`);
      }
      else {
        alert("You have exceeded the number in the center!");
      }    }
  }

  const handleLargeIncrement = () => {
    if (!limitLarge) {
      setLargeCounter(prevLargeCounter => prevLargeCounter + 1);
    }
    else {
      if (total === largeCounter) {
        alert(`You have exceeded the number you can take!\nNumber of sanitary pads you can take: ${total}`);
      }
      else {
        alert("You have exceeded the number in the center!");
      }    }
  }

  const handleOvernightIncrement = () => {
    if (!limitOvernight) {
      setOvernightCounter(prevOvernightCounter => prevOvernightCounter + 1);
    }
    else {
      if (total === overnightCounter) {
        alert(`You have exceeded the number you can take!\nNumber of sanitary pads you can take: ${total}`);
      }
      else {
        alert("You have exceeded the number in the center!");
      }
    }
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
    UserService.padNumToCenter(region, centerInfo.name, 
      originalLiner, originalMedium, originalLarge, originalOvernight, 
      linerCounter, mediumCounter, largeCounter, overnightCounter)
      .then(() => {
        setOriginalLiner(0);
        setOriginalMedium(0);
        setOriginalLarge(0);
        setOriginalOvernight(0);
        setLinerCounter(0);
        setMediumCounter(0);
        setLargeCounter(0);
        setOvernightCounter(0);
        setCheckedLiner(false);
        setCheckedMedium(false);
        setCheckedLarge(false);
        setCheckedOvernight(false);

        alert("Thank you! Your submission has been sent.");
        window.location.reload();
        /*
        <CustomAlert 
        title="Thank you!"
        content="Your submission has been sent." 
        close={close} />
        */
      })
  }

  useEffect(() => {
    if (updateMypage) {
      UserService.getUserInfo();
      handleUpdate();
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
            control={<Checkbox name="liner" checked={checkedLiner} onChange={() => setCheckedLiner(!checkedLiner)} color="secondary" />}
            label={<Typography variant="body2">Panty Liner</Typography>}
          />
        </Grid>
        <Grid item xs={6}> 
          <FormControlLabel
            control={<Checkbox name="medium" checked={checkedMedium} onChange={() => setCheckedMedium(!checkedMedium)} color="secondary" />}
            label={<Typography variant="body2">Medium</Typography>}
          />
        </Grid>
        <Grid item xs={6}> 
          <FormControlLabel
            control={<Checkbox name="large" checked={checkedLarge} onChange={() => setCheckedLarge(!checkedLarge)} color="secondary" />}
            label={<Typography variant="body2">Large</Typography>}
          />
        </Grid>
        <Grid item xs={6}> 
          <FormControlLabel
            control={<Checkbox name="overnight" checked={checkedOvernight} onChange={() => setCheckedOvernight(!checkedOvernight)} color="secondary" />}
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
        { checkedLiner ? (
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
        { checkedMedium ? (
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
        { checkedLarge ? (
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
        { checkedOvernight ? (
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
                  {checkedLiner ? (
                    <TableRow>
                      <TableCell>Panty Liner</TableCell>
                      <TableCell>{originalLiner}</TableCell>
                      <TableCell>{linerCounter}</TableCell>
                    </TableRow>
                  ) : null}
                  {checkedMedium ? (
                    <TableRow>
                      <TableCell>Medium</TableCell>
                      <TableCell>{originalMedium}</TableCell>
                      <TableCell>{mediumCounter}</TableCell>
                    </TableRow>
                  ) : null}
                  {checkedLarge ? (
                    <TableRow>
                      <TableCell>Large</TableCell>
                      <TableCell>{originalLarge}</TableCell>
                      <TableCell>{largeCounter}</TableCell>
                    </TableRow>
                  ) : null}
                  {checkedOvernight ? (
                    <TableRow>
                      <TableCell>Overnight</TableCell>
                      <TableCell>{originalOvernight}</TableCell>
                      <TableCell>{overnightCounter}</TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
              <div className={classes.popupNotice}>⚠ There may be disadvantages in case of false information.</div>
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
