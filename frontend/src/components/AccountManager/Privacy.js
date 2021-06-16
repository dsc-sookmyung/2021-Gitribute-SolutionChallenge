import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import round_person from '../../assets/images/round_person.png';
import EditIcon from '@material-ui/icons/Edit';
import CustomAlert from '../Common/CustomAlert';
import CustomPopup from '../Common/CustomPopup';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

import UserService from '../../services/user.service';

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
    },
    input: {
      display: 'none'
    }
}));

const Privacy = (user) => {
    const [newUsername, setNewUsername] = useState(user.username);
    const [isVisible, setIsVisible] = useState(true);
    const [profilePicture, setProfilePicture] = useState(user.profile);
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const classes = useStyles();

    const handleUsername = (e) => {
        setNewUsername(e.target.value);
    }

    const handleVisibility = (e) => {
        e.preventDefault();

        setIsVisible(!isVisible);
    }

    const handlePicture = (e) => {
        e.preventDefault();

        if (e.target.files[0]) {
          const reader = new FileReader();
          const file = e.target.files[0];
          console.log(file);
          setProfilePicture(file);
          setShowAlert(true);
        }
    }

    const close = () => {
      setShowAlert(false);
    }    

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleUpdatePassword = (e) => {
        if (UserService.checkPassword(currentPassword)) {
            if (newPassword === confirmPassword) {
                if (UserService.updatePassword(newPassword)) {
                    alert("Your password has been changed successfully.");
                }
                else {
                    alert("The password has not been changed. Please try again.")
                }
            }
            else {
                alert("The new passwords do not match.")
            }   
        }
        else {
            alert("The current password is incorrect.");
        }
    }

    const handleUpdatePrivacy = async () => {
        if (await UserService.updatePrivacy(newUsername, isVisible)) {
            alert("Update privacy successfully!");
        }
        else {
            alert("Update privacy failed.");
        }
    }
  
    return (
        <div>
          <div className={classes.content}>
            <div>
                <span className={classes.title}>
                  Profile Picture&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handlePicture}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="outlined" component="span">
                        <EditIcon fontSize="small"/>
                    </Button>
                </label>
                {showAlert ? (
                <CustomAlert 
                title={<CropOriginalIcon fontSize="large"/>}
                content="Profile picture has been changed!"
                close={close} />
                ) : null}
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
                <CustomPopup 
                  trigger={
                    <Button variant="outlined">
                      <EditIcon fontSize="small"/>
                    </Button>
                    }  
                  title="Do you want to change your password?"
                  content={
                      <div>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label=" Current password"
                        type="password"
                        id="currentPassword"
                        autoComplete="current-password"
                        onChange={handleCurrentPassword}
                      />
                      <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "100%"}} /> <br/>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New password"
                        type="password"
                        id="newPassword"
                        autoComplete="new-password"
                        onChange={handleNewPassword}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New password confirmation"
                        type="password"
                        id="confirmPassword}"
                        autoComplete="confirm-password"
                        onChange={handleConfirmPassword}
                      />
                      </div>
                    }
                  btnText="Change Password"
                  handleSubmit={handleUpdatePassword}
                />
            </div>
            <div>***********</div>
          </div>
          <div className={classes.content}>
            <div className={classes.title}>
                Rank visibility&nbsp;&nbsp;&nbsp;&nbsp;
                <Switch
                checked={isVisible}
                onChange={handleVisibility}
                color="secondary"
                />
            </div>
            <div>
                You can choose whether to display your username in the donor ranking list. <br/>
               <span style={{ color: "#bdbdbd"}}>
                    Setting: { isVisible ? "Visible" : "Invisible"}
                </span>
            </div>
          </div>
          <br/>
            <Button variant="contained" color="secondary" onClick={handleUpdatePrivacy}>
                Update privacy
            </Button>
        </div>
    )
}

export default Privacy;