import React from 'react';
import { withRouter } from 'react-router';
import intl from 'react-intl-universal';
import jwtDecode from 'jwt-decode';
import SigninUI from './SigninUI/SigninUI';
import api from '../../api';
import { openNotification, setJWTToken } from '../../utils/util';
import constants from '../../utils/constants';

const Signin = (props) => {

    const handleSubmit = data => {
        props.spinLoading(true);
        api.signinRequest(data).then(
            data => {
                props.spinLoading(false);
                if (data.isOk) {
                    openNotification({
                        type: constants.notifiction.type.success,
                        message: intl.get('SigninUI_msg_signin_success')
                    });
                    setJWTToken(data.token);
                    props.setUser(jwtDecode(data.token));
                    props.history.push('/');
                } else {
                    openNotification({
                        type: constants.notifiction.type.error,
                        message: intl.get('SigninUI_msg_signin_failed') + data.message
                    })
                }
            }).catch(error => {
                props.spinLoading(false);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('SigninUI_msg_signin_failed') + data.message
                })
                console.error(data.error);
            });
    }

    return (
        <SigninUI onSubmit={handleSubmit} />
    );
}

export default withRouter(Signin);