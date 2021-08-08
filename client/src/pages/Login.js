import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Input, Button, Alert } from 'antd';
import { Redirect } from 'react-router-dom';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ basic_email: '', basic_password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // submit form
  const handleFormSubmit = async (event) => {
    try {
      const { data } = await login({
        variables: event,
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      basic_email: '',
      basic_password: '',
    });
  };

  if (Auth.loggedIn()) {
    return <Redirect to="/home" />;
  }

  return (
    <main className="flex-row justify-center mb-4 mt-4 ">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Login</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              
              <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleFormSubmit}
              onFinishFailed={onFinishFailed}
             >
            <Form.Item
              label="Email"
              name="email"
              value={formState.basic_email}
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              value={formState.basic_password}
              onChange={handleChange}
            >

              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="link"><Link to="/signup"> Not Registered yet? Signup Here... </Link></Button>

            </Form.Item>
          </Form>


            )}

            {error && (
              <Alert message={error.message} type="error" />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
