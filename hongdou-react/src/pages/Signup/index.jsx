import React from 'react';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import { withRouter } from 'react-router-dom';
import SignupView from './SignupView';
import api from '../../api';
import constants from '../../utils/constants';
import { openNotification } from '../../utils/util';
import spinLoading from '../../store/actions/loadingAciton';
import { bindActionCreators } from 'redux';

const Signup = (props) => {

    const handleSubmit = values => {
        console.log('hand', values)
        props.spinLoading(true);//loading开始
        // 用户注册
        api.signupRequest(values)
            .then(
                data => {
                    console.log('data',data)
                    props.spinLoading(false);//loading结束
                    if (data.isOk) {
                        openNotification({
                            type: constants.notifiction.type.success,
                            message: intl.get('SignupView_msg_sign_success') + data.message
                        });
                        props.history.push('/');

                    } else {
                        openNotification({
                            type: constants.notifiction.type.error,
                            message: intl.get('SignupView_msg_sign_failed') + data.message
                        });
                        console.error(data.error);
                    }
                }
            ).catch(error => {
                props.spinLoading(false);//loading结束
                console.error(error);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('SignupView_msg_sign_failed')
                });
            });;
    }

    return (
        <SignupView onFinish={handleSubmit} />
    );
}

const mapStatusToProps = state => {
    return {
        loadingStatus: state.loadingStatus
    };
}

const mapDispatchToProps = dispatch => {
    return {
        spinLoading: bindActionCreators(spinLoading, dispatch)
    }
}

export default connect(mapStatusToProps, mapDispatchToProps)(withRouter(Signup));