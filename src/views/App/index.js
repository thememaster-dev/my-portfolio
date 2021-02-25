import React, { Suspense, lazy } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Fallback from 'src/components/Fallback';
import NotFound from '../404';

const Home = lazy(() => import('../Home'));

const useStyle = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

const App = () => {
  const classes = useStyle();

  return (
    <Container maxWidth='md' className={classes.container}>
      <Grid container spacing={3}>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Grid>
    </Container>
  );
};

export default App;
