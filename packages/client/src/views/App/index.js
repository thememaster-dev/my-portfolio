import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Fallback from 'src/components/Fallback';
import Layout from 'src/containers/Layout';
import NotFound from '../404';

const Home = lazy(() => import('../Home'));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
