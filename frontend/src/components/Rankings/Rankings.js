import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CustomPopup from '../Common/CustomPopup';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  }
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
    <div className={classes.root}>
        <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
    </div>
    );
}
  
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
  
function createData(rank, level, username, total) {
  return { rank, level, username, total };
}
  
let rows = [
    createData(1, '🌼🌼🌼', 'dooooonor1', 122),
    createData(2, '🌼', 'donor2', 101),
    createData(3, '🍀🍀', 'donor3', 71),
    createData(4, '🌿', 'donor4', 30),
    createData(4, '🌿', 'donor5', 30),
    createData(6, '🌱🌱', 'donor6', 17),
    createData(7, '🌱', 'donor7', 3),
]
  
const useStyles2 = makeStyles({
    container: {
      height: "100vh",
      backgroundColor: "#fff",
      padding: "6.5rem calc((100vw - 1193px) / 2 + 1rem)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      '@media screen and (max-width: 1193px)': {
        padding: "6.5rem 1rem"
      },
      '@media screen and (max-width:767px)': {
         padding: "6.5rem 2rem",
         flexDirection: "column"
       },
    },
    margin: {
      marginBottom: "2rem"
    },
    table: {
      minWidth: 500,
    },
    tableHead: {
      backgroundColor: "rgba(156, 39, 176, 0.1)"
    },
    rank: {
        fontWeight: "bold"
    }, 
    rankFirst: {
        fontWeight: "bold",
        color: "#ffc107"
    },
    rankSecond: {
        fontWeight: "bold",
        color: "#9e9e9e"
    },
    rankThird: {
        fontWeight: "bold",
        color: "#cd7f32"
    },
    fontExtremeBold: {
      fontWeight: 700,
    }
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
  
export default function Rankings() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rankings, setRankings] = useState();
  const classes = useStyles2();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(async () => {
    const ranks = await UserService.getRankings();    
    console.log(JSON.stringify(ranks));    
    setRankings(ranks);

    const user = AuthService.getCurrentUser();
    if (user) {
        setCurrentUser(user);   
    }
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (rankings) {
      rows =
        rankings.map((ranking) => 
            createData(ranking.rank, ranking.level, ranking.username, ranking.total)
        );
    }
  }, [rankings]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.container}>
      <Typography variant="h3" className={classes.margin}>
        Donor Rankings
        <CustomPopup 
          trigger={
            <IconButton color="primary" aria-label="help">
              <HelpOutlineIcon color='action' />
            </IconButton>}  
          title="Information"
          content={<div>The ranking is determined according to the total number of sanitary pad donations. <br/><br/>
          If you do not want to show yourself in the rankings, follow these steps: <br/>
          1. Click your profile in the top right corner <br/>
          2. Click Signed in as username to enter My Page <br/>
          3. Click Privacy info <br/>
          4. Turn off the visibility switch!</div>}
        />
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="rankings pagination table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.fontExtremeBold}>Rank</TableCell>
              <TableCell className={classes.fontExtremeBold} align="left">Username</TableCell>
              <TableCell className={classes.fontExtremeBold} align="right"># of Donations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.name}>
                <TableCell style={{ width: 240 }} component="th" scope="row">
                  {
                  row.rank === 1 ? <span className={classes.rankFirst}>{row.rank}</span> :
                  row.rank === 2 ? <span className={classes.rankSecond}>{row.rank}</span> :
                  row.rank === 3 ? <span className={classes.rankThird}>{row.rank}</span> :
                  <span className={classes.rank}>{row.rank}</span>
                  }
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;
                  {
                    row.total >= 120 ? row.level = "💖" :
                    row.total >= 110 ? row.level = "🌼🌼🌼" :
                    row.total >= 100 ? row.level = "🌼🌼" :
                    row.total >= 90 ? row.level = "🌼" :
                    row.total >= 80 ? row.level = "🍀🍀🍀" : 
                    row.total >= 70 ? row.level = "🍀🍀" :
                    row.total >= 60 ? row.level = "🍀" :
                    row.total >= 50 ? row.level = "🌿🌿🌿" :
                    row.total >= 40 ? row.level = "🌿🌿" :
                    row.total >= 30 ? row.level = "🌿" :
                    row.total >= 20 ? row.level = "🌱🌱🌱" :
                    row.total >= 10 ? row.level = "🌱🌱" : row.level = "🌱"
                  }
                  </span>
                </TableCell>
                <TableCell align="left">
                  {row.username}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.total}
                </TableCell>
              </StyledTableRow>
            ))}
  
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
