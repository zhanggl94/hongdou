import React from 'react';
import { Form, Input, Button } from 'antd';
import constants from '../../../utils/constants';
import { getLabel, getMessage, replaceStr, openNotification } from '../../../utils/util';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const SignupView = (props) => {

    const labels = getLabel('SignupView');
    const messages = getMessage('SignupView');

    const onFinish = values => {
        props.onFinish(values);
        openNotification({
            type: constants.notifiction.type.success,
            description: '注册成功'
        })
    };

    const onFinishFailed = message => {
        console.log(message);
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
                name="confirmPassword"
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