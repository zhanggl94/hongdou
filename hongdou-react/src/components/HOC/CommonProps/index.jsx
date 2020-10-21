import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import spinLoading from '../../../store/actions/loadingAciton';
import setUser from '../../../store/actions/setUserAction';

export default Commponent => {
    const CommonProps = props => {
        return (
            <Commponent {...props} />
        );
    }

    const mapStateToProps = ({ auth }) => {
        return {
            auth
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            spinLoading: bindActionCreators(spinLoading, dispatch),
            setUser: bindActionCreators(setUser, dispatch)
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(CommonProps);
}