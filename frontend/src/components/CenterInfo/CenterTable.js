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
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CountInputForm from './CountInputForm';
import MapContainer from './MapContainer';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 100,
  },
  tablePC: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    },
  },
  tablePCCenter: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    },
    height: "28rem"
  },
  tablePCCenterInfo: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    },   
    height: "28rem"
  },
  tableMobile: {
    [theme.breakpoints.up('md')]: {
      display: "none"
    }, 
    width: "calc(100vw - 2rem)",
  },
  innerTable: {
    minWidth: 200,
  },
  mobileMap: {
    width: "98vw"
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

function Row({ id, center, role, star, handleMarker, showForm }) {
  const [open, setOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState("");
  const classes = useStyles();

  const showDetail = () => {
    setSelectedCenter(center);
    setOpen(!open);
  }

  return (
    <>
      <TableRow className={classes.root} hover onClick={showDetail}>
        <TableCell component="th" scope="row" align="left">
          {center.name} Center
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableRow>
              <TableCell className={classes.mobileMap}>
                <MapContainer lat={center.lat} lng={center.lng} handleMarker={handleMarker} role={role} showForm={showForm} />
              </TableCell>
            </TableRow>
            {showForm ? (
              <TableRow>
                <TableCell style={{ paddingBottom: "0.4rem" }}>
                  <CountInputForm role={role} center={selectedCenter} />
                </TableCell>
              </TableRow>
            ) : (null)}
            <TableRow>
              <TableCell>
                <a 
                  href="#" 
                  style={{ textDecoration: "inherit", color: "inherit" }}>
                    { star === center.name ? 
                      "⭐ My Primary Center" : "☆ Save as Primary Center" }
                </a>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <strong>❤ Number of Sanitary Pads</strong>
                <Table className={classes.innerTable} aria-label="simple table">
                  <TableBody>
                    {padNumber.map((pad) => {
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
                    🔑 Password
                  </TableCell>
                </TableRow>
              ) : null }
            <TableRow>
              <TableCell>
                📍 Location
              </TableCell>
            </TableRow>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const CenterTable = ({ currentUser, role, region, star, centerNames, defaultCenter }) => {
  const classes = useStyles();
  const [selectedCenter, setSelectedCenter] = useState("");
  const [centerInfo, setCenterInfo] = useState(undefined);
  const [showForm, setShowForm] = useState(false);
  const [opens, setOpens] = useState(false);
  const [currentStar, setCurrentStar] = useState(star);
  const [clickStar, setClickStar] = useState(false);
  // const [centerName, setCenterName] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  
  console.log("default: "+JSON.stringify(defaultCenter));

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    else {
      if (!defaultCenter.location) {
        setCenterInfo(undefined);
        setShowForm(false);
      }
    }
  }, [region]);

  useEffect(() => {
    console.log("centerInfo: "+JSON.stringify(centerInfo));
  }, [centerInfo]);

  useEffect(() => {
    console.log("selectedCenter: "+selectedCenter);
  }, [selectedCenter]);

  useEffect(async () => {
    await UserService.getUserInfo();
    const user = await AuthService.getCurrentUser();
    if (user) {
      console.log("user: "+JSON.stringify(user));
      setCurrentStar(user.center);
      console.log("star: "+JSON.stringify(user.center));  
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
    setShowDetail(true);
  }

  const handleMarker = (e) => {
    if (currentUser) {
      if (centerInfo) {
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

  return (
    <Grid container className={classes.table}>
      {/* PC */}
      <Grid item md={3}>
        <TableContainer className={classes.tablePCCenter} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Center</strong></TableCell></TableRow>
          </TableHead>
          <TableBody>
            {centerNames.length >= 1 ? (
              centerNames.map((center) => {
                return (
                  <TableRow 
                    key={center} 
                    className="chooseitems" 
                    hover
                    onClick={() => {handleDetail(center)}}>
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
        <TableContainer className={classes.tablePCCenterInfo} component={Paper}>
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
                      {padNumber.map((pad) => {
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
        <TableContainer className={classes.tablePCCenterInfo} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ borderLeft: "none" }}>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  { centerInfo ? (
                    <MapContainer lat={parseFloat(centerInfo.lat)} lng={parseFloat(centerInfo.lng)} handleMarker={handleMarker} role={role} showForm={showForm} />
                  ) : (
                    <MapContainer lat={parseFloat(defaultCenter.lat)} lng={parseFloat(defaultCenter.lng)} handleMarker={handleMarker} role={role} showForm={showForm} />
                  )}
                </TableCell>
              </TableRow>
              {showForm ? (
                <TableRow>
                  <TableCell style={{ paddingBottom: "0.4rem" }}>
                    <CountInputForm role={role} region={region} centerInfo={centerInfo} />
                  </TableCell>
                </TableRow>
              ) : (null)}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* Mobile */}
      <Grid item md={12}>
        <TableContainer className={classes.tableMobile} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {centerNames.length >= 1 ? (
              centerNames.map((center, index) => (
                <Row key={center.name} id={index} className="chooseitmes" center={center} role={role} star={star} handleMarker={handleMarker} showForm={showForm} />
              ))
            ) : (
              <Row center={defaultCenter} role={role} star={star} handleMarker={handleMarker} showForm={showForm} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
  );
}

export default CenterTable;
