import React from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import intl from 'react-intl-universal';
import SigninView from './SigninView';
import spinLoading from '../../store/actions/loadingAciton';
import signinRequest from '../../api/signin';
import { openNotification } from '../../utils/util';
import constants from '../../utils/constants';

const Signin = (props) => {

    const handleSubmit = data => {
        props.spinLoading(true);
        signinRequest(data).then(
            data => {
                props.spinLoading(false);
                if (data.isOk) {
                    openNotification({
                        type: constants.notifiction.type.success,
                        message: intl.get('SigninView_msg_signin_success')
                    });
                    props.history.push('/');
                } else {
                    openNotification({
                        type: constants.notifiction.type.error,
                        message: intl.get('SigninView_msg_signin_failed') + data.message
                    })
                }
            }).catch(error => {
                props.spinLoading(false);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('SigninView_msg_signin_failed') + data.message
                })
                console.error(data.error);
            });
    }

    return (
        <SigninView onSubmit={handleSubmit} />
    );
}

// const mapStateToProps = state => {
//     return {
//         laodingStatus: state.loadingStatus
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        spinLoading: bindActionCreators(spinLoading, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Signin));