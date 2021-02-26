import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import styles from 'src/utils/styles';

const useStyles = makeStyles({
  hero: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  subTitle: {
    textTransform: 'uppercase',
  },
});

const HeroBanner = () => {
  const classes = useStyles();
  const style = styles();
  return (
    <Grid item sm={12} className={classes.hero}>
      <Typography
        className={style.uppercase}
        variant='h6'
        component='h6'
        gutterBottom
      >
        Full-stack web developer
      </Typography>
      <Typography
        className={classes.uppercase}
        variant='h1'
        component='h1'
        gutterBottom
      >
        Ariful Islam
      </Typography>
    </Grid>
  );
};

export default HeroBanner;
