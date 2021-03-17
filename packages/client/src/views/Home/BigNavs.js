import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import MyNavCard from 'src/components/MyNavCard';

const useStyle = makeStyles((theme) => ({
  bignav: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
  },
}));

const BigNavs = () => {
  const classes = useStyle();

  return (
    <div className={classes.bignav}>
      <Grid container>
        <Grid item xs={6}>
          <MyNavCard />
        </Grid>
        <Grid item xs={6}>
          <MyNavCard />
        </Grid>
        <Grid item xs={6}>
          <MyNavCard />
        </Grid>
        <Grid item xs={6}>
          <MyNavCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default BigNavs;
