import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Profile from '../Profile';

const useStyle = makeStyles((theme) => ({
  container: {
    // paddingTop: theme.spacing(1.5),
    // paddingBottom: theme.spacing(1.5),
  },
}));

const Layout = (props) => {
  const { children } = props;
  const classes = useStyle();

  return (
    <Container maxWidth='md' className={classes.container}>
      <Grid container>
        <Grid item xs={6}>
          <Profile />
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
