import React from 'react';
import HeaderView from './HeaderView';

const Header = (props) => {
    return (
            <HeaderView changeLang={props.changeLang} />
    );
}

export default Header;