import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Popup from "reactjs-popup";
import CustomPopup from '../Common/CustomPopup';
import UserService from '../../services/user.service';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: "bold",
        margin: "1rem 0"
    },
    liMargin: {
        marginBottom: "0.5rem"
    },
    popupTop: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        marginTop: theme.spacing(3)
    },
    popupTitle: {
        flex: "0 1 auto",
        position: "absolute",
        marginRight: "auto",
        marginLeft: "2rem"
    },
    popupClose: {
      flex: "0 1 auto",
      marginLeft: "auto",
    },
    popupContent: {
      padding: "2rem"
    },
    popupButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"    
    }
}));

const contentStyle = {
    maxWidth: "90vw",
    width: "34vw",
    background: "#fff",
    boxShadow: "3px 5px 5px 3px rgba(0, 0, 0, 0.1)"
};

const Account = (props) => {
    const [password, setPassword] = useState("");  
    const classes = useStyles();

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const handleSubmit = async(e) => {
        await UserService.deleteAccount(password)
        .then((data) => {
            if (data.message === "success") {
                alert("Delete your account successfully!");
                props.history.push("/");
                window.location.reload();
            }
            else if (data.message === "incorrect") {
                alert("Your password is not correct. Please try again.");
            }
            else {
                alert("Failed to delete account. Please try again.");
            }
        }
        )
    }

    const content = 
    <div>
        Please enter your password to delete your account.
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />
    </div>;

    return (
        <div>
            <div className={classes.title}>Delete account</div>
            <div>If you delete your account: </div>
            <ul className={classes.listMargin}>
                <li className={classes.liMargin}>You can't regain access to your account.</li>
                <li className={classes.liMargin}>It may take up to 30 days from the beginning of the deletion process to delete your Blooming information. Copies of your information may also remain after the 30 days in the backup storage that we use to recover in the event of a disaster, software error, or other data loss event. Your information isn't available to you on Blooming during this time.</li>
                <li className={classes.liMargin}>Copies of some materials such as log records may remain in our database but are disassociated from personal identifiers.</li>
                <li className={classes.liMargin}>We may also keep your information for things like legal issues, terms violations, or harm prevention efforts.</li>
                <li className={classes.liMargin}>Please refer to the Law and Protection section of our Privacy Policy for more information.</li>
            </ul>
            
            <hr style={{border: "solid 0.1px #e9ecef", transform: "scaleY(0.5)", width: "100%"}} /> <br/>
            
            <CustomPopup
              trigger={
                <Button variant="contained" color="secondary">
                    Delete your account
                </Button>
              }
              title="Are you sure?"
              content={content}
              handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default withRouter(Account);