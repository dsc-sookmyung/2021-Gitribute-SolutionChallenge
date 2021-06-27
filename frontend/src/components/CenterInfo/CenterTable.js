import React, { useEffect, useState, useRef } from 'react';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CountInputForm from './CountInputForm';
import MapContainer from './MapContainer';

/* star 취소한 경우 바로 업데이트 안됨 문제 */

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 100,
    backgroundColor: "white",
    [theme.breakpoints.down('xs')]: {
      width: "100vw"
    },
  },
  tableCenter: {
    height: "28rem",
    [theme.breakpoints.down('sm')]: {
      width: "36rem",
      height: "100%"
    },
    [theme.breakpoints.down('xs')]: {
      width: "20rem"
    },
  },
  innerTable: {
    minWidth: 200,
  },
  map: {
    [theme.breakpoints.down('sm')]: {
      width: "36rem",
      height: "100%"
    },
    [theme.breakpoints.down('xs')]: {
      width: "20rem"
    },
  },
  tableRow: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#9c27b0",
      "& > .MuiTableCell-root": {
        color: "#fff"
      }
    }
  },
  overflowScroll: {
    overflow: "scroll",
  }
}));

function createPadData(type, number) {
  return { type, number };
}

let padNumber = [
  createPadData('Panty Liner', 0),
  createPadData('Medium', 0),
  createPadData('Large', 0),
  createPadData('Overnight', 0),
];

const CenterTable = ({ currentUser, role, region, star, centerNames, defaultCenter, handleUpdate, searchName }) => {
  const [selectedCenter, setSelectedCenter] = useState(star);
  const [centerInfo, setCenterInfo] = useState(undefined);
  const [padInfo, setPadInfo] = useState(padNumber);
  const [showForm, setShowForm] = useState(false);
  const [currentStar, setCurrentStar] = useState(star);
  const [clickStar, setClickStar] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const classes = useStyles();
  const myRef = useRef(null);

  useEffect(() => {
    if (searchName) {
      setSelectedCenter(searchName);
      setShowDetail(false);
    }
    else if (star) {
      setSelectedCenter(star);
    }
    else if (centerNames.center === "Center is in preparation!") {
      setCenterInfo(defaultCenter);
      setShowForm(false);
      padNumber = [
        createPadData('Panty Liner', 0),
        createPadData('Medium', 0),
        createPadData('Large', 0),
        createPadData('Overnight', 0),
      ];
      setPadInfo(padNumber);
    }
    else {
      setSelectedCenter(defaultCenter.name);
    }
  }, [defaultCenter]);

  useEffect(() => {
    if (star & !searchName) {
      setSelectedCenter(star);
    }
  }, [star]);

  useEffect(() => {
    setSelectedCenter(searchName);
    setShowDetail(true);
  }, [searchName]);

  useEffect(() => {
    console.log("centerInfo: "+JSON.stringify(centerInfo));
    if (centerInfo) {
      padNumber = [
        createPadData('Panty Liner', centerInfo.pads.liner),
        createPadData('Medium', centerInfo.pads.medium),
        createPadData('Large', centerInfo.pads.large),
        createPadData('Overnight', centerInfo.pads.overnight),
      ];    
      setPadInfo(padNumber);    
    }
  }, [centerInfo]);

  useEffect(async () => {
    console.log("selectedCenter: "+selectedCenter);
    const getCenterInfo = await UserService.getCenter(region, selectedCenter)
    setCenterInfo(getCenterInfo);
  }, [selectedCenter]);

  useEffect(async () => {
    await UserService.getUserInfo();
    const user = await AuthService.getCurrentUser();
    if (user) {
      setCurrentStar(user.center);
      handleUpdate();
    }
  }, [clickStar])

  useEffect(() => {
    console.log("current star: "+currentStar);
  }, [currentStar]);

  useEffect(async () => {
    if (showDetail) {
      // GET center info
      const getCenterInfo = await UserService.getCenter(region, selectedCenter)
      setCenterInfo(getCenterInfo);
      console.log("GET: "+JSON.stringify(getCenterInfo));
      if (getCenterInfo.location) {
        padNumber = [
          createPadData('Panty Liner', getCenterInfo.pads.liner),
          createPadData('Medium', getCenterInfo.pads.medium),
          createPadData('Large', getCenterInfo.pads.large),
          createPadData('Overnight', getCenterInfo.pads.overnight),
        ];        
        setPadInfo(padNumber);
      }
      setShowDetail(false);
    }
  }, [showDetail]);

  const onClickStar = async () => {
    await UserService.handleStar(selectedCenter);
    setClickStar(!clickStar);
  }

  const handleDetail = (center) => {
    console.log(JSON.stringify(center));
    setSelectedCenter(center);
    executeScroll();
    setShowDetail(true);
  }

  const handleMarker = (e) => {
    if (currentUser) {
      if (centerInfo || defaultCenter.location) {
        setShowForm(!showForm);
      }
      else {
        alert("Center is in preparation!");
      }
    }
    else {
      alert("Available after login");
    }
  }

  const executeScroll = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth'})
    }
  }

  return (
    <Grid container className={classes.table}>
      <Grid item md={3}>
        <TableContainer className={classes.tableCenter} component={Paper} style={{backgroundColor: "white"}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Center</strong></TableCell></TableRow>
          </TableHead>
          <TableBody className={classes.overflowScroll}>
            {centerNames.length >= 1 ? (
              centerNames.map((center) => {
                return (
                  <TableRow 
                    key={center} 
                    hover
                    onClick={() => {handleDetail(center)}}
                    selected={selectedCenter === center}
                    classes={{ selected: classes.selected }}
                    className={classes.tableRow}
                    ref={classes.selected ? myRef : null}
                  >
                    <TableCell className="chooseItemActive">
                      {center} Station
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow 
                hover
                onClick={() => {handleDetail(defaultCenter)}}>
                <TableCell>
                  {centerNames.center}
                  {centerNames.location ? (
                    " Station"
                  ) : null}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item md={3}>
        <TableContainer className={classes.tableCenter} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ borderRight: "none" }}><strong>Center Information</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <a 
                    href="#" 
                    onClick={onClickStar}
                    style={{ textDecoration: "inherit", color: "inherit" }}>
                      { currentStar === selectedCenter ? 
                        "⭐ My Primary Center" : "☆ Save as Primary Center" }
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <strong>❤ Number of Sanitary Pads</strong>
                  <Table className={classes.innerTable} aria-label="simple table">
                    <TableBody>
                      {
                        padNumber.map((pad) => {
                          return (
                          <TableRow key={pad.type}>
                            <TableCell component="th" scope="row">
                              {pad.type}
                            </TableCell>
                            <TableCell align="right">{pad.number}</TableCell>
                          </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
              { role === 1 ? (
                <TableRow>
                  <TableCell>
                    {centerInfo ? (
                      "🔑"+centerInfo.password
                    ) : (
                      "🔑"+defaultCenter.password
                    )}
                  </TableCell>
                </TableRow>
              ) : null }
              <TableRow>
                <TableCell>
                  {centerInfo ? (
                      "📍 "+centerInfo.location
                    ) : (
                      "📍 "+defaultCenter.location
                    )}
                </TableCell>
              </TableRow>
              {/*<CenterTableData classes={classes} star={star} padNumber={padNumber} role={role} selectedCenter={selectedCenter} />*/}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={6}>
        <TableContainer className={classes.tableCenterInfo} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ borderLeft: "none" }}>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.map}>
                  {centerInfo ? (
                    <MapContainer lat={parseFloat(centerInfo.lat)} lng={parseFloat(centerInfo.lng)} handleMarker={handleMarker} role={role} showForm={showForm} />
                  ) : (
                    <MapContainer lat={parseFloat(defaultCenter.lat)} lng={parseFloat(defaultCenter.lng)} handleMarker={handleMarker} role={role} showForm={showForm} />
                  )}
                </TableCell>
              </TableRow>
              {showForm ? (
                <TableRow>
                  <TableCell style={{ paddingBottom: "0.4rem" }}>
                    <CountInputForm role={role} region={region} centerInfo={centerInfo} handleUpdate={handleUpdate} />
                  </TableCell>
                </TableRow>
              ) : (null)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default CenterTable;
