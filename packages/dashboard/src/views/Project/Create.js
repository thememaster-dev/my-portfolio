import React, { useState } from 'react';
import Card from 'antd/lib/card';
import 'antd/lib/card/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Form from 'antd/lib/form';
import 'antd/lib/form/style/css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';
import Upload from 'antd/lib/upload';
import 'antd/lib/upload/style/css';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import { useHistory } from 'react-router-dom';

import { createProject } from 'src/api';
import { CreateProjectForm } from 'src/forms';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const ProjectCreate = () => {
  const [fileList, setFileList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const history = useHistory();

  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onSubmit = async (event) => {
    const data = {
      title: event?.title,
      body: event?.body,
      projectUrl: event?.link,
    };
    try {
      setLoading(true);

      await createProject(data);

      setLoading(false);
      setErrors({});
      form.resetFields();
    } catch (error) {
      setErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

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
      <CreateProjectForm onSubmit={createProject} formName='createProject' />
      {/* <Form {...layout} form={form} name='createProject' onFinish={onSubmit}>
        <Form.Item name='title' label='Project Title'>
          <Input />
        </Form.Item>
        <Form.Item name='link' label='Project Link'>
          <Input />
        </Form.Item>
        <Form.Item name='body' label='Description'>
          <TextArea showCount maxLength={100} />
        </Form.Item>
        <Form.Item label='Dragger'>
          <Form.Item
            name='dragger'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            noStyle
          >
            {/* <Upload.Dragger name='files' action='/upload.do'>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger> */}
      {/*   <Upload
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              listType='picture-card'
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {!fileList && '+ Upload'}
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button loading={loading} type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Form> */}
    </Card>
  );
};

export default ProjectCreate;
