import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
      <Grid container>{children}</Grid>
    </Container>
  );
};

export default Layout;
