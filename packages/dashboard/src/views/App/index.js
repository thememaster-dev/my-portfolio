import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Fallback from 'src/components/Fallback';
import Layout from 'src/containers/Layout';

const Home = lazy(() => import('../Home'));
const ProjectList = lazy(() => import('../Project/List'));
const ProjectCreate = lazy(() => import('../Project/Create'));

const App = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/projects'>
              <ProjectList />
            </Route>
            <Route exact path='/projects/create'>
              <ProjectCreate />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
