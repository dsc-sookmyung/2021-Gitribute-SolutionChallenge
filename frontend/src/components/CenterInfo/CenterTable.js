import React, { useEffect, useState } from 'react';
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
}));

function createCenterName(name, order) {
  return { name, order };
}

function createPadData(type, number) {
  return { type, number };
}

function createOperationData(day, hour) {
  return { day, hour }
}

const centerName = [
  createCenterName('Baengma', 1),
  createCenterName('Madu', 2),
]

const padNumber = [
  createPadData('Panty Liner', 5),
  createPadData('Meidum', 12),
  createPadData('Large', 7),
  createPadData('Overnight', 3),
];

const operationHours = [
  createOperationData('Mon-Thu', '9am - 7pm'),
  createOperationData('Fri', '9am - 6pm'),
  createOperationData('Sat', '10am - 5pm'),
]

/*
function ShowDetail(name, selectedCenter, setSelectedCenter) {
  useEffect(() => {
    setSelectedCenter(name);
  }, [selectedCenter]);
}
*/

function Favorites(name, favorite, setFavorite) {
  useEffect(() => {
    setFavorite(name);
    console.log("FAV: "+favorite);
    console.log("CENTER: "+name);
  }, [favorite]);
}

function Row({ id, center, role, star }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow className={classes.root} hover onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row" align="left">
          {center.name} Center
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableRow>
              <TableCell>
                <MapContainer lat={41.3797} lng={2.1682} />
              </TableCell>
            </TableRow>
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

const CenterTable = ({ role, region, star, centerNames }) => {
  const classes = useStyles();
  const [selectedCenter, setSelectedCenter] = useState("Baengma");
  const [centerInfo, setCenterInfo] = useState({});
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {

  }, [selectedCenter]);

  const showDetail = (e, name) => {
    e.preventDefault();
    setCenterInfo(UserService.getCenter(region, name));
    alert(UserService.getCenter(region, name));
    // GET center info
  }

  const handleMarker = (e) => {
    setShowForm(!showForm);
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
            {centerName.map((center) => {
              return (
                <TableRow 
                  key={center.name} 
                  className="chooseitems" 
                  hover
                  onClick={(e) => {showDetail(e, center.name)}}>
                  <TableCell className="chooseItemActive">
                    {center.name} Center
                  </TableCell>
                </TableRow>
              );
            })}
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
                    onClick={() => UserService.handleStar(selectedCenter)}
                    style={{ textDecoration: "inherit", color: "inherit" }}>
                      { star === selectedCenter ? 
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
                  <MapContainer lat={41.3797} lng={2.1682} handleMarker={handleMarker} role={role} showForm={showForm} />
                </TableCell>
              </TableRow>
              {showForm ? (
                <TableRow>
                  <TableCell style={{ paddingBottom: "0.4rem" }}>
                    <CountInputForm role={role} handlePad={UserService.handlePad}/>
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
            {centerName.map((center, index) => (
              <Row key={center.name} id={index} className="chooseitmes" center={center} role={role} star={star} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
    </Grid>
  );
}

export default CenterTable;
