import React from 'react';
import { withRouter } from 'react-router-dom';
import intl from 'react-intl-universal';
import constants from '../../../utils/constants';
import { getJWTToken, openNotification } from '../../../utils/util';

export default Component => {

    const auth = (props) => {
        let isTokenExist = true;
        if (!getJWTToken()) {
            openNotification({ type: constants.notifiction.type.warning, message: intl.get('Auth_msg_need_signin') });
            isTokenExist = false;
            props.history.push('/signin');
        }
        return (
            isTokenExist ? <Component /> : <></>
        );
    }
    return withRouter(auth);

}