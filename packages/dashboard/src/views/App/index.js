import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Fallback from 'src/components/Fallback';

const Home = lazy(() => import('../Home'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
