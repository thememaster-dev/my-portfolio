import React from 'react';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/css';
import { NavLink } from 'react-router-dom';
import UserOutlined from '@ant-design/icons/UserOutlined';
import ProjectOutlined from '@ant-design/icons/ProjectOutlined';

const { Item } = Menu;

const Navigation = () => {
  return (
    <Menu theme='dark' defaultSelectedKeys={['/']} mode='inline'>
      <Item key='/' icon={<UserOutlined />}>
        <NavLink to='/'>Profile</NavLink>
      </Item>
      <Item key='projects' icon={<ProjectOutlined />}>
        <NavLink to='/projects'>Projects</NavLink>
      </Item>
    </Menu>
  );
};

export default Navigation;
