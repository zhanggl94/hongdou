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

const SigninView = () => {

    const labels = getLabel('SigninView');
    console.log(labels)
    const messages = getMessage('SigninView');

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

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    {labels.signin}
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SigninView;