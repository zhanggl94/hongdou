import React from 'react';
import intl from 'react-intl-universal';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import SignupUI from './SignupUI/SignupUI';
import api from '../../api';
import constants from '../../utils/constants';
import { openNotification, setJWTToken } from '../../utils/util';

const Signup = (props) => {

    const handleSubmit = values => {
        props.spinLoading(true);//loading开始
        // 用户注册
        api.signupRequest(values)
            .then(
                data => {
                    props.spinLoading(false);//loading结束
                    if (data.isOk) {
                        setJWTToken(data.jwtToken);
                        props.setUser(jwtDecode(data.jwtToken));
                        openNotification({
                            type: constants.notifiction.type.success,
                            message: intl.get('SignupUI_msg_sign_success') + data.message
                        });
                        props.history.push('/');
                    } else {
                        openNotification({
                            type: constants.notifiction.type.error,
                            message: intl.get('SignupUI_msg_sign_failed') + data.message
                        });
                        console.error(data.error);
                    }
                }
            ).catch(error => {
                props.spinLoading(false);//loading结束
                console.error(error);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('SignupUI_msg_sign_failed')
                });
            });;
    }

    return (
        <SignupUI onFinish={handleSubmit} />
    );
}

export default withRouter(Signup);