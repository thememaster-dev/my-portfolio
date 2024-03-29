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
import { useHistory, useParams } from 'react-router-dom';

import { getUnpublishedPeojects, getPublishedPeojects } from 'src/api';
import Project from 'src/components/Project';

const ProjectList = () => {
  const [loading, setLoading] = useState(true);
  const [unpublishedPage, setUnpublishedPage] = useState(1);
  const [unPublishedProject, setUnPublishedProject] = useState({});

  const history = useHistory();
  const { type, page } = useParams();

  useEffect(() => {
    const fetchUnpublishedPeoject = async () => {
      try {
        setLoading(true);
        if (type === 'published') {
          const { data } = await getPublishedPeojects(page);
          setUnPublishedProject(data);
        } else if (type === 'unpublished') {
          const { data } = await getUnpublishedPeojects(page);
          setUnPublishedProject(data);
        }
        setLoading(false);
      } catch (error) {
        console.log('fetch peoject listing error: ', error);
        setLoading(false);
      }
    };
    fetchUnpublishedPeoject();
  }, [page, type]);

  const handelProjectListingRoute = (tp) => history.push(`/project/l/${tp}`);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}
      >
        <div>
          <Button
            onClick={() => handelProjectListingRoute('published')}
            type={type === 'published' ? 'primary' : 'default'}
          >
            Published
          </Button>
          <Button
            onClick={() => handelProjectListingRoute('unpublished')}
            type={type === 'unpublished' ? 'primary' : 'default'}
          >
            Unpublished
          </Button>
        </div>
        <Button onClick={() => history.push('/project/create')} type='primary'>
          Create new Project
        </Button>
      </div>
      <div style={{ padding: 30, background: '#fff' }}>
        <Row gutter={[24, 24]} style={{ justifyContent: 'center' }}>
          {!loading ? (
            <>
              {unPublishedProject?.project &&
                unPublishedProject?.project.map((item) => {
                  const { _id, body, title, slug } = item;

                  return (
                    <Col key={_id} span={6}>
                      <Project
                        image=''
                        title={title}
                        link={body}
                        slug={slug}
                        type={type}
                      />
                    </Col>
                  );
                })}
              <Col span={24}>
                <Pagination
                  style={{ textAlign: 'center', marginTop: 20 }}
                  defaultCurrent={page}
                  pageSize={unPublishedProject?.limit}
                  showSizeChanger={false}
                  total={unPublishedProject?.count}
                  onChange={(p) => {
                    history.push(`/project/l/${type}/${p}`);
                  }}
                />
              </Col>
            </>
          ) : (
            'Loading'
          )}
        </Row>
      </div>
    </>
  );
};

export default ProjectList;
