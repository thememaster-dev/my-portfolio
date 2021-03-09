import React from 'react';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

const Fallback = () => {
  return (
    <div className='fallback'>
      <Spin tip='Loading...' />
    </div>
  );
};

export default Fallback;
