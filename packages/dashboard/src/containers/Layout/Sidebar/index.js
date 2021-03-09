import React from 'react';
import Layout from 'antd/lib/layout';
import { useSelector } from 'react-redux';

const { Sider } = Layout;

const Sidebar = () => {
  const collapsed = useSelector((state) => state.layout.collapsed);

  return <Sider trigger={null} collapsible collapsed={collapsed}></Sider>;
};

export default Sidebar;
