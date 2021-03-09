import React from 'react';
import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/css';

const { Header, Footer, Sider, Content } = Layout;

const LayoutAdmin = (props) => {
  const { children } = props;

  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>Header</Header>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
