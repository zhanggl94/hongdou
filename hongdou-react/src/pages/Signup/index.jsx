import React, { useState } from 'react';
import SignupView from './SignupView';
import api from '../../api';

const Signup = () => {

    const [request, setRequest] = useState({});

    const handleSubmit = values => {
        console.log('hand', values)
        api.signupRequest(values)
            .then(
                data => {
                    console.log('success');
                    // setRequest({ 'result': 'ok' })
                }
            ).catch(error => {

            });;
    }

    return (
        <SignupView onFinish={handleSubmit} />
    );
}

export default Signup;