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

const SignupView = (props) => {

    const onFinish = values => {
        props.onFinish(values);
    };

    const onFinishFailed = message => {
        console.log('finished', message);
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label={intl.get('SignupView_lbl_username')}
                name="username"
                rules={[{
                    required: true,
                    message: intl.get('SignupView_msg_notNull', { param: intl.get('SignupView_lbl_username') })
                }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={intl.get('SignupView_lbl_password')}
                name="password"
                rules={[{
                    required: true,
                    message: intl.get('SignupView_msg_notNull', { param: intl.get('SignupView_lbl_password') })
                }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label={intl.get('SignupView_lbl_confirmPassword')}
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: intl.get('SignupView_msg_notNull', { param: intl.get('SignupView_lbl_confirmPassword') })
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(intl.get('SignupView_msg_notSame'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {intl.get('SignupView_lbl_signup')}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignupView;