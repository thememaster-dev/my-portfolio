import React, { useState, useEffect } from 'react';
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
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/css';
import { useHistory } from 'react-router-dom';

import { getUnpublishedPeoject } from 'src/api';
import Project from 'src/components/Project';

const { TabPane } = Tabs;

const ProjectList = () => {
  const [unPublishedProject, setUnPublishedProject] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchUnpublishedPeoject = async () => {
      try {
        const { data } = await getUnpublishedPeoject(1);
        setUnPublishedProject(data);
      } catch (error) {
        console.log('fetchUnpublishedPeoject error: ', error);
      }
    };
    fetchUnpublishedPeoject();
  }, []);

  return (
    <Card
      title='My Projects'
      extra={
        <Button type='primary' onClick={() => history.push('/projects/create')}>
          Create a new project
        </Button>
      }
    >
      <Row gutter={[24, 24]} style={{ justifyContent: 'center' }}>
        <Col span={24}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Published ' key='1'>
              Published Project
            </TabPane>
            <TabPane tab='Unpublished' key='2'>
              <Row gutter={[24, 24]} style={{ justifyContent: 'center' }}>
                {unPublishedProject?.project &&
                  unPublishedProject?.project.map((item) => {
                    const { _id, body, title } = item;
                    return (
                      <Col key={_id} span={6}>
                        <Project image='' title={title} link={body} />
                      </Col>
                    );
                  })}
              </Row>
            </TabPane>
          </Tabs>
        </Col>

        <Col span={24}>
          <Pagination
            style={{ textAlign: 'center', marginTop: 20 }}
            defaultCurrent={1}
            pageSize={5}
            showSizeChanger={false}
            total={500}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ProjectList;
