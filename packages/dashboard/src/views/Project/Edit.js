import React from 'react';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';

import { editProject } from 'src/api';
import { EditProjectForm } from 'src/forms';

const EditProject = () => {
  return (
    <Card title='Edit Project'>
      <EditProjectForm name='editProjectForm' onSubmit={editProject} />
    </Card>
  );
};

export default EditProject;
