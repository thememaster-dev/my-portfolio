import React from 'react';
import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/css';
import { useSelector } from 'react-redux';

import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

const LayoutAdmin = (props) => {
  const { children } = props;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Layout>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Content className='main-wrapper'>{children}</Content>
          </Layout>
        </>
      ) : (
        <Content className='main-wrapper'>{children}</Content>
      )}
    </Layout>
  );
};

export default LayoutAdmin;
