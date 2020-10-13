import React from 'react';
import { Form, Input, Button } from 'antd';

import { getLabel, getMessage, replaceStr } from '../../../utils/util';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const SignupView = () => {

    const labels = getLabel('SignupView');
    console.log(labels)
    const messages = getMessage('SignupView');

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                label={labels.username}
                name="username"
                rules={[{ required: true, message: replaceStr(messages.notNull, [labels.username]) }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={labels.password}
                name="password"
                rules={[{ required: true, message: replaceStr(messages.notNull, [labels.password]) }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label={labels.confirmPassword}
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: replaceStr(messages.notNull, [labels.confirmPassword])
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(messages.notSame);
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {labels.signup}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignupView;