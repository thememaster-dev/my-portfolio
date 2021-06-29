import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Fallback from 'src/components/Fallback';
import Layout from 'src/containers/Layout';
import AdminRoute from 'src/containers/AdminRoute';
import { meCheck } from 'src/api';
import { setCurrentUser, logOutUser } from 'src/state/ducks/authentication';

const Home = lazy(() => import('../Home'));
const SignIn = lazy(() => import('../SignIn'));
const ProjectList = lazy(() => import('../Project/List'));
const ProjectCreate = lazy(() => import('../Project/Create'));
const ProjectEdit = lazy(() => import('../Project/Edit'));

const App = () => {
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        if (!localStorage.jwtToken) {
          setLoading(false);
          return;
        }
        const {
          data: { token },
        } = await meCheck();
        if (token) {
          dispatch(setCurrentUser({ token }));
          setLoading(false);
          return;
        }
        dispatch(logOutUser());
        setLoading(false);
      } catch (error) {
        console.log(error);
        dispatch(logOutUser());
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) return <Fallback />;

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
              component={Home}
            />
            <AdminRoute
              exact
              path='/project/l/:type/:page?'
              isAuthenticated={isAuthenticated}
              role={user?.role}
              component={ProjectList}
            />
            <AdminRoute
              exact
              path='/project/create'
              isAuthenticated={isAuthenticated}
              role={user?.role}
              component={ProjectCreate}
            />
            <AdminRoute
              exact
              path='/project/edit/:slug/:type'
              isAuthenticated={isAuthenticated}
              role={user?.role}
              component={ProjectEdit}
            />
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
