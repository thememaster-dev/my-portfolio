import React from 'react';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import Project from 'src/components/Project';

const ProjectList = () => {
  return (
    <Card
      title='My Projects'
      extra={<Button type='primary'>Create a new project</Button>}
    >
      <Row gutter={[24, 24]}>
        <Col className='gutter-row' span={6}>
          <Project image='' title='Hello project' link='xdfsdv' />
        </Col>
      </Row>
    </Card>
  );
};

export default ProjectList;
