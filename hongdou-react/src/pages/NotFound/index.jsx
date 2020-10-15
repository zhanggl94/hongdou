import React from 'react';
import intl from 'react-intl-universal';

const NotFound =()=>{
    return(
    <div>{intl.get('NotFound_msg_noPage')}</div>
    );
}

export default NotFound;