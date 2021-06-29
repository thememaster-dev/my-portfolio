import React, { useState } from 'react';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import { useParams, useHistory } from 'react-router-dom';

import {
  editProject,
  getUnpublishedPeoject,
  getPublishedPeoject,
} from 'src/api';
import { EditProjectForm } from 'src/forms';

const EditProject = () => {
  const [initialValues, setInitialValues] = useState({});
  const history = useHistory();
  const { slug, type } = useParams();
  React.useEffect(() => {
    const fetchnpublishedPeoject = async () => {
      try {
        if (type === 'published') {
          const { data } = await getPublishedPeoject(slug);
          setInitialValues(data);
        } else if (type === 'unpublished') {
          const { data } = await getUnpublishedPeoject(slug);
          setInitialValues(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchnpublishedPeoject();
  }, [slug, type]);

  return (
    <Card
      title={
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => history.goBack()}
          type='text'
        >
          Back
        </Button>
      }
    >
      {initialValues?.project?.title && (
        <EditProjectForm
          name='editProjectForm'
          onSubmit={editProject}
          initialValues={initialValues}
        />
      )}
    </Card>
  );
};

export default EditProject;
