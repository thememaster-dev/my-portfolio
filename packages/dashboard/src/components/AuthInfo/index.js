import React from 'react';
import Popover from 'antd/lib/popover';
import 'antd/lib/popover/style/css';
import Avatar from 'antd/lib/avatar';
import 'antd/lib/avatar/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { useDispatch, useSelector } from 'react-redux';

import { logOutUser } from 'src/state/ducks/authentication';

const AuthInfo = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const content = (
    <div className='auth-info'>
      <Avatar
        className='user-avatar'
        size={60}
        icon={<UserOutlined />}
        src=''
      />
      <h2>{user?.name}</h2>
      <Button
        onClick={() => dispatch(logOutUser())}
        size='small'
        type='primary'
        danger
        icon={<LogoutOutlined />}
      >
        Log out
      </Button>
    </div>
  );

  return (
    <Popover placement='bottomRight' content={content} trigger='click'>
      <Button className='btn-simple' shape='round'>
        <Avatar icon={<UserOutlined />} src='' />
      </Button>
    </Popover>
  );
};

export default AuthInfo;
