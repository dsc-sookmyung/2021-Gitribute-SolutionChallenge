import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    levelInfo: {
        padding: "0 0.5rem"
    },
}))

const StyledTableCell = withStyles((theme) => ({
    root: {
        padding: "0.75rem 1rem"
    },
}))(TableCell);

const RankTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.levelInfo}>
        <Table aria-label="customized table">
            <TableHead>
            <TableRow>
                <TableCell className={classes.fontBold} align="left">RANK TITLE</TableCell>
                <TableCell className={classes.fontBold} align="left">RANK ICON</TableCell>
                <TableCell className={classes.fontBold} align="left">RANK POINT</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <StyledTableCell align="left">Butterfly</StyledTableCell>
                    <StyledTableCell align="left">🦋</StyledTableCell>
                    <StyledTableCell align="left">120 ~</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Grown flower</StyledTableCell>
                    <StyledTableCell align="left">🌼🌼🌼</StyledTableCell>
                    <StyledTableCell align="left">110 ~ 119</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Flower</StyledTableCell>
                    <StyledTableCell align="left">🌼🌼</StyledTableCell>
                    <StyledTableCell align="left">100 ~ 109</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Little flower</StyledTableCell>
                    <StyledTableCell align="left">🌼</StyledTableCell>
                    <StyledTableCell align="left">90 ~ 99</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Grown four leaf clover</StyledTableCell>
                    <StyledTableCell align="left">🍀🍀🍀</StyledTableCell>
                    <StyledTableCell align="left">80 ~ 89</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Four leaf clover</StyledTableCell>
                    <StyledTableCell align="left">🍀🍀</StyledTableCell>
                    <StyledTableCell align="left">70 ~ 79</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Little four leaf clover</StyledTableCell>
                    <StyledTableCell align="left">🍀</StyledTableCell>
                    <StyledTableCell align="left">60 ~ 69</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Grown leaf</StyledTableCell>
                    <StyledTableCell align="left">🌿🌿🌿</StyledTableCell>
                    <StyledTableCell align="left">50 ~ 59</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Leaf</StyledTableCell>
                    <StyledTableCell align="left">🌿🌿</StyledTableCell>
                    <StyledTableCell align="left">40 ~ 49</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Little leaf</StyledTableCell>
                    <StyledTableCell align="left">🌿</StyledTableCell>
                    <StyledTableCell align="left">30 ~ 39</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Grown sprout</StyledTableCell>
                    <StyledTableCell align="left">🌱🌱🌱</StyledTableCell>
                    <StyledTableCell align="left">20 ~ 29</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Sprout</StyledTableCell>
                    <StyledTableCell align="left">🌱🌱</StyledTableCell>
                    <StyledTableCell align="left">10 ~ 19</StyledTableCell>
                </TableRow>
                <TableRow>
                    <StyledTableCell align="left">Little sprout</StyledTableCell>
                    <StyledTableCell align="left">🌱</StyledTableCell>
                    <StyledTableCell align="left">0 ~ 9</StyledTableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  );
}

export default RankTable;
