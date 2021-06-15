import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "bold",
        margin: "1rem 0"
    }
}));

const Home = (user) => {
    const [role, setRole] = useState(0);
    const [level, setLevel] = useState("🌱");
    const [total, setTotal] = useState("0");
    const [pads, setPads] = useState({liner: 0, medium: 0, large: 0, overnight: 0});
    const classes = useStyles();
  
    useEffect(() => {
        if (user) {
            setRole(user.role);
        }
    }, [user]);
    
    return (
        <>
        {role === 1 ? (
            <div>
              <div className={classes.title}>Available this month</div>
              <div className={classes.title}>History</div>  
            </div>          
        ) : (
            <div>
              <div className={classes.title}>Level {level}</div>
              <div className={classes.title}>Total {total}</div>
            </div>
        )}
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <TableCell align="left">Liner</TableCell>
                    <TableCell align="left">Medium</TableCell>
                    <TableCell align="left">Large</TableCell>
                    <TableCell align="left">Overnight</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{pads.liner}</TableCell>
                        <TableCell align="center">{pads.medium}</TableCell>
                        <TableCell align="center">{pads.large}</TableCell>
                        <TableCell align="center">{pads.overnight}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default Home;