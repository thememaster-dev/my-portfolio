import React from 'react';
import Layout from 'antd/lib/layout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const collapsed = useSelector((state) => state.layout.collapsed);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Link className='logo' to='/'>
        {collapsed ? 'P' : 'Portfolio'}
      </Link>
    </Sider>
  );
};

export default Sidebar;
