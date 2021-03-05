import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '2.5rem calc((100vw - 1193px) / 2 + 1rem)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    '@media screen and (max-width: 1193px)': {
      padding: '2.5rem 1rem'
    },
  },
  table: {
    [theme.breakpoints.up('md')]: {
      width: "1194px",
    }, 
    width: "calc(100vw - 2rem)",
  },
  description: {
    background: "#e9ecef",
  },
  hr: {
    [theme.breakpoints.up('md')]: {
      width: "1194px",
    }, 
    width: "calc(100vw - 2rem)",
    border: "solid 0.1px #e9ecef", 
    transform: "scaleY(0.5)", 
  },
  title: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(3)
  }
}))

const FAQ = () => {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [openThird, setOpenThird] = useState(false);
  const classes = useStyles();

  return (
    <>
    <div>
      image
    </div>
    <Container component="main" className={classes.paper}>
      <Typography variant="h3">
        FAQ
      </Typography>
      <hr className={classes.hr} />
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {/* First Question */}
          <TableRow hover onClick={() => setOpenFirst(!openFirst)}>
            <TableCell>
              <strong>Service</strong> &nbsp; How to ...?
            </TableCell>
          </TableRow>
          <TableRow className={classes.description}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={openFirst} timeout="auto" unmountOnExit>
                <TableRow>
                  <TableCell>
                    description...
                  </TableCell>
                </TableRow>
              </Collapse>
            </TableCell>
          </TableRow>
          {/* Second Question */}
          <TableRow hover onClick={() => setOpenSecond(!openSecond)}>
            <TableCell>
              <strong>Service</strong> &nbsp; Where ...?
            </TableCell>
          </TableRow>
          <TableRow className={classes.description}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={openSecond} timeout="auto" unmountOnExit>
                <TableRow>
                  <TableCell>
                    description...
                  </TableCell>
                </TableRow>
              </Collapse>
            </TableCell>
          </TableRow>
          {/* Third Question */}
          <TableRow hover onClick={() => setOpenThird(!openThird)}>
            <TableCell>
              <strong>Finance</strong> &nbsp; What ...?
            </TableCell>
          </TableRow>
          <TableRow className={classes.description}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={openThird} timeout="auto" unmountOnExit>
                <TableRow>
                  <TableCell>
                    description...
                  </TableCell>
                </TableRow>
              </Collapse>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography variant="h3" className={classes.title}>
        Please send your questions by email
      </Typography>
      ✉ &nbsp; <strong>Email</strong> <br/ >
      sookmyung.ac.kr
    </Container>
    </>
  );
}

export default FAQ;
