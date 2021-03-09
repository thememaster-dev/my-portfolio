import React from 'react';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Row from 'antd/lib/row';
import 'antd/lib/row/style/css';
import Col from 'antd/lib/col';
import 'antd/lib/col/style/css';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style/css';

import Project from 'src/components/Project';

const ProjectList = () => {
  return (
    <Card
      title='My Projects'
      extra={<Button type='primary'>Create a new project</Button>}
    >
      <Row gutter={[24, 24]} style={{ justifyContent: 'center' }}>
        <Col span={6}>
          <Project image='' title='Hello project' link='xdfsdv' />
        </Col>
        <Col span={6}>
          <Project image='' title='Hello project' link='xdfsdv' />
        </Col>
        <Col span={24}>
          <Pagination
            style={{ textAlign: 'center', marginTop: 20 }}
            defaultCurrent={6}
            showSizeChanger={false}
            total={500}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ProjectList;
