import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Img404 from '../media/Img404.jpg';
import FormDialog from './FormDialog';


const useStyles = makeStyles({
  Card: {
    maxWidth: 500,
    backgroundColor: '#f0f8ff',
    margin: '10px auto',
  },
  Media: {
    height: '300px',
    width: 'auto',
  },
  Footer: {
    height: 10,
    margin: 5,

  },
  Caption: {
    height: 10,
  }
});



export default function MemeCard(props) {
  const classes = useStyles();
  // console.log(props)
  const { id, name, url, caption, fun } = props;
  const data = {
    id: props.id,
    name: props.name,
    caption: props.caption,
    func: fun,
    url: props.url
  }
  return (
    <div>
    <Card className={classes.Card}>
      <CardActionArea>
        <div 
          style={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            backgroundColor: "black",
          }}
        >
          <CardMedia className = {classes.Media}
            component="img"
            alt="Meme"
            src={url}
            onError={(e) => { e.target.onerror = null; e.target.src=Img404}}
          />
        </div>
        
        <CardContent className = {classes.Caption}>
          <Typography gutterBottom variant="h6" color="textSecondary" component="p">
            {caption}
          </Typography>
        </CardContent>
        <CardContent className = {classes.Footer}>
          <Typography variant="h6" component="em">
            -{name} 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <FormDialog meme = {data}/>
    </div>
  );
}