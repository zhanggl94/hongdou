import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../pages/App'
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin/Signin';
import Signup from '../pages/Signup/Signup';
import Auth from '../components/HOC/Auth';
import CarBill from '../pages/CarBill/CarBill';
import CommonProps from '../components/HOC/CommonProps';

const Routers = () => {
    return (
        <Router>
            <App>
                <Switch>
                    <Route exact path='/' component={Auth(Home)}></Route>
                    <Route path='/signup' component={CommonProps(Signup)}></Route>
                    <Route path='/signin' component={CommonProps(Signin)}></Route>
                    <Route exact path='/carbill' component={Auth(CommonProps(CarBill))}></Route>
                    <Route path='*' component={NotFound}></Route>
                </Switch>
            </App>
        </Router>
    );
}

export default Routers;