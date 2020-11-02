import React from 'react';
import { connect } from 'react-redux';
import CarList from './CarList/CarList';

const Car = (props) => {
    return (
        <CarList currentUser={props.currentUser} />
    );
}

const mapStateToProps = ({ auth }) => {
    return {
        currentUser: auth.currentUser
    }
}

export default connect(mapStateToProps, null)(Car);