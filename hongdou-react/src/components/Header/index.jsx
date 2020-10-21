import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setUser from '../../store/actions/setUserAction';
import { clearJWTToken } from '../../utils/util';
import HeaderView from './HeaderView';

const Header = (props) => {

    const handleClearUser = () => {
        clearJWTToken();
        props.setUser({});
    }

    return (
        <HeaderView changeLang={props.changeLang} auth={props.auth} clearUser={handleClearUser} />
    );
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: bindActionCreators(setUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);