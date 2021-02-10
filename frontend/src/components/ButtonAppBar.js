import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, withTheme } from '@material-ui/core';
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
  }
}));



export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className = {classes.header}>
        <Toolbar>

          <img src={XMemeLogo} alt="XMeme Logo!" className={classes.logo} />
          <Typography variant="h6" className={classes.title} align = 'right'>
            <Button variant="contained" color="primary" href="mailto:narendramanglani04@gmail.com" target = "_blank"> 
              Contact Me!
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}