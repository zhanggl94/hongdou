import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { withRouter } from 'react-router-dom';
import SignupView from './SignupView';
import api from '../../api';
import constants from '../../utils/constants';
import { openNotification } from '../../utils/util';

const Signup = (props) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = values => {
        console.log('hand', values)
        setLoading(true);
        // 用户注册
        api.signupRequest(values)
            .then(
                data => {
                    setLoading(false);
                    if (data.error) {
                        openNotification({
                            type: constants.notifiction.type.error,
                            message: intl.get('SignupView_msg_sign_failed')
                        });
                        console.error(data.error);
                    } else {
                        openNotification({
                            type: constants.notifiction.type.success,
                            message: intl.get('SignupView_msg_sign_success')
                        });
                        props.history.push('/');
                    }
                }
            ).catch(error => {
                setLoading(false);
                console.error(error);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('SignupView_msg_sign_failed')
                });
            });;
    }

    return (
        <SignupView onFinish={handleSubmit} loading={loading} />
    );
}

export default withRouter(Signup);