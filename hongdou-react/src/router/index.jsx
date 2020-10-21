import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../pages/App'
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Auth from '../components/HOC/Auth';
import CarBill from '../pages/CarBill';
import CommonProps from '../components/HOC/CommonProps';

const Routers = () => {
    return (
        <Router>
            <App path='/'>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/signup' component={CommonProps(Signup)}></Route>
                    <Route path='/signin' component={CommonProps(Signin)}></Route>
                    <Route path='/carbill' component={Auth(CommonProps(CarBill))}></Route>
                    <Route path='*' component={NotFound}></Route>
                </Switch>
            </App>
        </Router>
    );
}

export default Routers;