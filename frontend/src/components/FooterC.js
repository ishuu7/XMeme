import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    bottom: 0,
    alignItems: 'center'
  },
  title: {
    justifyContent: 'center',
    fontSize: 'large'
  },
  header: {
    backgroundColor: "black",
    color: "white",
    maxHeight: '100px'
  },
  logo: {
    fontSize: 'large',
    margin: 'auto 5px'
    
  },
  button: {
    margin: theme.spacing(1),
  },
  developer: {
    color: 'white',
    margin: 'auto 10px'
  },
  social: {
    margin: '-10px 5px',
    color: 'white'
  }
}));



export default function FooterC() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className = {classes.header}>
      
          <Toolbar className = {classes.title}>
                <div>
                    Made with 
                    <FavoriteIcon className={classes.logo}/>
                        by Narendra
                        <a href = "https://linkedin.com/in/ishuu7" target = '_'><LinkedInIcon fontSize = "large" className = {classes.social} /></a>
                        <a href = "https://github.com/ishuu7" target ='_'><GitHubIcon fontSize = "large" className = {classes.social}/></a>
                        <a href = "mailto:narendramanglani04@gmail.com" target = '_' ><MailIcon fontSize = "large" className = {classes.social} /></a>
                </div>
            </Toolbar>
            
            
      </AppBar>
    </div>
  );
}