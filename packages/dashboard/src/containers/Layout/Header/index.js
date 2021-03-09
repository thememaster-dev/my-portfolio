import React from 'react';
import Layout from 'antd/lib/layout';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';

import { toggleCollapsed } from 'src/state/ducks/ui';

const { Header } = Layout;

const HeaderTop = () => {
  const collapsed = useSelector((state) => state.layout.collapsed);

  const dispatch = useDispatch();
  return (
    <Header className='header'>
      <Button
        className='btn-simple'
        onClick={() => dispatch(toggleCollapsed())}
      >
        <FeatherIcon icon={collapsed ? 'align-left' : 'align-right'} />
      </Button>
    </Header>
  );
};

export default HeaderTop;
