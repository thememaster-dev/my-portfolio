import React, { Suspense, lazy } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Switch, Route } from 'react-router-dom';

import Fallback from 'src/components/Fallback';
import NotFound from '../404';

const Home = lazy(() => import('../Home'));

const App = () => {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Box>
    </Container>
  );
};

export default App;
