import React from 'react';
import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/css';

import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

const LayoutAdmin = (props) => {
  const { children } = props;

  return (
    <Layout>
      <Sidebar />
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
