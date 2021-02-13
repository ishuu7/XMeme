import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, withTheme } from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import XMemeLogo from '../media/XMemeLogo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "black",
    color: "white",
    maxHeight: '75px'
  },
  logo: {
    maxWidth: 90,
    marginRight: '10px'
  },
  button: {
    margin: theme.spacing(1),
  },
}));



export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className = {classes.header}>
        <Toolbar>
          <img src={XMemeLogo} alt="XMeme Logo!" className={classes.logo} />
          <Typography variant="h6" className={classes.title} align = 'right'>
            <Button variant="contained" color="secondary" endIcon = {<LaunchIcon />} className = {classes.button} href = "https://xmeme-ishuu7.herokuapp.com/swagger-ui" target = "_blank">
              Swagger
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}