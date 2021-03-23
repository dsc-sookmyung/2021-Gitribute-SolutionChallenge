import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  container: {
    background: "#fff",
    padding: "2.5rem calc((100vw - 1193px) / 2 + 1rem)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    '@media screen and (max-width: 1193px)': {
      padding: "2.5rem 1rem"
    },
  },
  table: {
    [theme.breakpoints.up('md')]: {
      width: "1194px",
    }, 
    width: "calc(100vw - 2rem)",
  },
  description: {
    background: "#f3e5f5"
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
    <div className={classes.container}>
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
        Contact Us
      </Typography>
      <FormControlLabel
        control={<a 
          target="_blank" 
          href="https://forms.gle/cXMVQLwAEEhsUoaf9"
          style={{ 
            backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Forms_2020_Logo.svg/1200px-Google_Forms_2020_Logo.svg.png")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: "4rem", height: "6rem" }} />}
        label="🔗 Form"
        labelPlacement="top"
      />
    </div>
    </>
  );
}

export default FAQ;
