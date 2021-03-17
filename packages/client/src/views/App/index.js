import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Fallback from 'src/components/Fallback';
import Layout from 'src/containers/Layout';
import NotFound from '../404';

const Home = lazy(() => import('../Home'));

const App = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
