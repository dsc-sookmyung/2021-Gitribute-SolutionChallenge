import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import round_person from '../../assets/images/round_person.png';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "bold",
        margin: "1rem 0"
    },
    profileImg: {
        borderRadius: "160px",
        border: "1px solid black"
    },
    content: {
        marginBottom: "1.5rem"
    }
}));

const Privacy = (user) => {
    const [newUsername, setNewUsername] = useState(user.username);
    const classes = useStyles();

    const handleUsername = (e) => {
        setNewUsername(e.target.value);
    }
  
    return (
        <div>
          <div className={classes.content}>
            <div className={classes.title}>
                Profile picture&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="outlined">
                    <EditIcon fontSize="small"/>
                </Button>
            </div>
            <img className={classes.profileImg} src={round_person} />
          </div>
          <div className={classes.content}>
            <div className={classes.title}>Username</div>
            <TextField
                variant="outlined"
                margin="small"
                id="username"
                name="username"
                label="Username"
                autoComplete="uname"
                defaultValue={user.username}
                value={newUsername}
                onChange={handleUsername}
            />
          </div>
          <div className={classes.content}>
            <div className={classes.title}>
                Password&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="outlined">
                    <EditIcon fontSize="small"/>
                </Button>
            </div>
            <div>***********</div>
          </div><br/>
            <Button variant="contained" color="secondary">
                Update profile
            </Button>
        </div>
    )
}

export default Privacy;