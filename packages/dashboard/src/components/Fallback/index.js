import React from 'react';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

import './style.scss';

const Fallback = () => {
  return (
    <div className='fallback'>
      <Spin tip='Loading...' />
    </div>
  );
};

export default Fallback;
