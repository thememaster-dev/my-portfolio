import React from 'react';
import Row from 'antd/lib/row';
import 'antd/lib/row/style/css';
import Col from 'antd/lib/col';
import 'antd/lib/col/style/css';
import Form from 'antd/lib/form';
import 'antd/lib/form/style/css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/css';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/css';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signin = () => {
  const [form] = Form.useForm();

  const onSubmit = async (event) => {};

  return (
    <Row>
      <Col span={10} offset={6}>
        <Form
          {...layout}
          name='signin'
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} valuePropName='checked'>
            <Checkbox defaultChecked>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signin;
