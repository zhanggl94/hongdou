import React from 'react';
import {getMessage} from '../../utils/util';
import intl from 'react-intl-universal';

const NotFound =()=>{
    console.log('notfound',intl);
    return(
    <div>{getMessage('NotFound').noPage}</div>
    );
}

export default NotFound;