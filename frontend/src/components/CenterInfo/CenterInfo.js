import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@material-ui/icons/Room';
import CenterTable from './CenterTable';

const useStyles = makeStyles((theme) => ({
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
  select: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  table: {
    maxWidth: "1194px",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
  },
  selectCurrent: {
    paddingRight: "0.5rem",
  },
  
}));

function MarkerRadio(props) {
  return (
    <Radio
      sx={{
        '&:hover': {
          bgcolor: 'transparent',
        },
      }}
      disableRipple
      color="default"
      checkedIcon={<RoomIcon style={{ color: "#9c27b0" }} />}
      icon={<RoomIcon style={{ color: "#000" }} />}
      {...props}
    />
  );
}

export default function CenterInfo({ handleUpdate }) {
  const [role, setRole] = useState(0);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [star, setStar] = useState(undefined);
  const [region, setRegion] = useState(0);
  const [centerNames, setCenterNames] = useState([]);
  const [defaultCenter, setDefaultCenter] = useState({});
  const [searchName, setSearchName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setRole(user.role);
      
      if (user.center) {
        setStar(user.center);
      }
    }
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(async () => {
    if (region === 7) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const defaultCenterInfo = await UserService.getNearestCenter(position.coords.latitude, position.coords.longitude);
            setCenterNames(defaultCenterInfo.center);
            setDefaultCenter(defaultCenterInfo);    
          },
          () => {
            handleLocationError(true);
          }
        )
      }
      else {
        // Brower doesn't support Geolocation
        handleLocationError(false);
      }
    }
    else {
      const defaultCenterInfo = await UserService.getDefaultCenter(region)
      if (defaultCenterInfo.center) {
        console.log("defaultCenterInfo: "+JSON.stringify(defaultCenterInfo));
        setCenterNames(defaultCenterInfo.center);
        setDefaultCenter(defaultCenterInfo);
      }
      else {
        setCenterNames({ center: "Center is in preparation!" });
        setDefaultCenter({"lat": 0.0, "lng": 0.0, "pads": {"liner": 0, "medium": 0, "large": 0, "overnight": 0}, "password": "password", "phonenumber": "phone number", "location": "location"})
      }
    }
  }, [region]);

  function handleLocationError(browserHasGeolocation) {
    let infoWindowContent = ""
      browserHasGeolocation
    ?  infoWindowContent = "Error: The Geolocation service failed."
    :  infoWindowContent = "Error: Your browser doesn't support geolocation."
  }  

  useEffect(() => {
    console.log("Centernames: "+JSON.stringify(centerNames));
  }, [centerNames]);

  useEffect(() => {
    console.log("DefaultCenter: "+JSON.stringify(defaultCenter));
  }, [defaultCenter]);

  useEffect(() => {
    console.log("searchName: "+searchName);
  }, [searchName]);

  const changeRegion = (e) => {
    setRegion(parseInt(e.target.value, 10));
  }

  const handleSearch = (event, value) => {
    setSearchName(value);
  }

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={6} md={9}>
        <Typography variant="h3">
          Search by area
        </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
        {centerNames && centerNames.length > 1 ? (
          <Autocomplete
            onChange={handleSearch}
            Search by center name
            id="search-name"
            options={centerNames.map((center) => {return (center);})}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Search by center name" 
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment:
                  <>
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
              />
            )}
          />
        ) : null}
        </Grid>
      </Grid>
      <Grid container className={classes.select}>
        <FormControl component="fieldset">
        <RadioGroup 
          defaultValue="0"
          row aria-label="location" 
          onChange={changeRegion}
          className={classes.radio}  
        >
          <Grid item sm={6} md={3}>
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="All"
          />
          </Grid>
          <Grid item sm={6} md={3}>
          <FormControlLabel
            value="1" 
            control={<Radio />}
            label="Seoul"
          />
          </Grid>
          <Grid item sm={6} md={3}>
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Gyeonggi/Incheon"
          />
          </Grid>
          <Grid item sm={6} md={3}>
          <FormControlLabel
            value="3"
            control={<Radio />}
            label={"Chungnam/Sejong/\nDaejeon/Gangwon"}
          />
          </Grid>
          <Grid item sm={6} md={3}>
          <FormControlLabel
            value="4" 
            control={<Radio />}
            label="Jeolla/Gwangju"
          />
          </Grid>
          <Grid item sm={6} md={3}>
          <FormControlLabel
            value="5" 
            control={<Radio />}
            label={"Gyeongsang/Daegu/\nBusan/Ulsan"}
          />
          </Grid>
          <Grid item sm={6} md={3}>
          <FormControlLabel
            value="6" 
            control={<Radio />}
            label="Jeju"
          />
          </Grid>
          <Grid item sm={6} md={3}>
          <FormControlLabel
            className={classes.selectCurrent}
            value="7" 
            control={<MarkerRadio />}
            label="Current Location Center"
          />
          </Grid>
        </RadioGroup>
        </FormControl>
      </Grid>
      <CenterTable className={classes.table} currentUser={currentUser} role={role} 
      region={region} star={star} centerNames={centerNames} defaultCenter={defaultCenter}
      handleUpdate={handleUpdate} searchName={searchName} />
    </div>
  );
}
