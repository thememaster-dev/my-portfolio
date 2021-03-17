import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    height: 'calc(50vh - 50px)',
    boxShadow: 'rgb(149 157 165 / 30%) 0px 0px 30px',
    border: 'none',
    borderRadius: 0,
  },
  action: {
    height: '100%',
  },
  content: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(5),
  },
}));

const MyNavCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.action}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica es
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MyNavCard;
