import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Fallback from 'src/components/Fallback';
import Layout from 'src/containers/Layout';
import AdminRoute from 'src/containers/AdminRoute';

const Home = lazy(() => import('../Home'));
const SignIn = lazy(() => import('../SignIn'));
const ProjectList = lazy(() => import('../Project/List'));
const ProjectCreate = lazy(() => import('../Project/Create'));

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Fallback />}>
          <Switch>
            <AdminRoute
              exact
              path='/'
              isAuthenticated={isAuthenticated}
              role={user?.role}
            >
              <Home />
            </AdminRoute>
            <AdminRoute
              exact
              path='/projects'
              isAuthenticated={isAuthenticated}
              role={user?.role}
            >
              <ProjectList />
            </AdminRoute>
            <AdminRoute
              exact
              path='/projects/create'
              isAuthenticated={isAuthenticated}
              role={user?.role}
            >
              <ProjectCreate />
            </AdminRoute>
            <Route exact path='/signin'>
              <SignIn />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;
