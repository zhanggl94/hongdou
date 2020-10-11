import React from 'react';
import {getMsg} from '../../utils/util';
import intl from 'react-intl-universal';

const NotFound =()=>{
    console.log('notfound',intl);
    return(
    <div>{getMsg('NotFound').noPage}</div>
    );
}

export default NotFound;