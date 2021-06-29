import React, { useState } from 'react';
import { string, func } from 'prop-types';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Form from 'antd/lib/form';
import 'antd/lib/form/style/css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';

const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const EditProjectForm = (props) => {
  const { onSubmit, formName, initialValues } = props;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();

  const handelSubmit = async (e) => {
    const value = {
      title: e?.title,
      body: e?.body,
      projectUrl: e?.link,
    };
    try {
      setLoading(true);

      await onSubmit(value);

      setLoading(false);
      if (errors !== null) {
        setErrors(null);
      }
    } catch (error) {
      setLoading(false);
      setErrors(error?.response?.data?.errors);
      console.log(`Error form for ${formName}: `, error);
    }
  };
  console.log('object', initialValues);
  return (
    <Form
      initialValues={initialValues?.project}
      {...layout}
      form={form}
      name={formName}
      onFinish={handelSubmit}
    >
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
        {/* <Form.Item
      name='dragger'
      valuePropName='fileList'
      // getValueFromEvent={normFile}
      noStyle
    > */}
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
        {/* <Upload
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        listType='picture-card'
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {!fileList && '+ Upload'}
      </Upload> */}
        {/* </Form.Item> */}
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={loading} type='primary' htmlType='submit'>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

EditProjectForm.defaultProps = {
  formName: 'editProject',
};

EditProjectForm.propTypes = {
  onSubmit: func.isRequired,
  formName: string,
};

export default EditProjectForm;
