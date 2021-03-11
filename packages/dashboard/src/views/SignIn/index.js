import React, { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { authLogin } from 'src/api';
import { setCurrentUser } from 'src/state/ducks/authentication';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onSubmit = async (event) => {
    try {
      setLoading(true);

      const { data } = await authLogin(event);

      dispatch(setCurrentUser({ token: data?.token }));

      setLoading(false);
      setErrors({});
    } catch (error) {
      setErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

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
            validateStatus={errors?.email && 'error'}
            help={errors?.email && errors.email}
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
            validateStatus={errors?.password && 'error'}
            help={errors?.password && errors.password}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} valuePropName='checked'>
            <Checkbox defaultChecked>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button loading={loading} type='primary' htmlType='submit'>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signin;
