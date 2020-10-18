import React from 'react';
import { Form, Input, Button } from 'antd';
import intl from 'react-intl-universal';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const SigninView = (props) => {

    const onFinish = values => {
        props.onSubmit(values);
    };

    const onFinishFailed = errorInfo => {
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label={intl.get('SigninView_lbl_username')}
                name="username"
                rules={[{
                    required: true,
                    message: intl.get('SigninView_msg_notNull', { param: intl.get('SigninView_lbl_username') })
                }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={intl.get('SigninView_lbl_password')}
                name="password"
                rules={[{
                    required: true,
                    message: intl.get('SigninView_msg_notNull', { param: intl.get('SigninView_lbl_password') })
                }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {intl.get('SigninView_lbl_signin')}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SigninView;