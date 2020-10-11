import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import HeaderView from './HeaderView';

const locales = {
    'zh': require('../../locales/zh.json'),
    'en': require('../../locales/en.json')
}

const Header = () => {


    const [lanInitDone, setlanInitDone] = useState(false);
    const [lanType, setlanType] = useState('zh');

    useEffect(() => {
        intl.init({
            currentLocale: 'zh',
            locales
        }).then(() => {
            setlanInitDone(true);
        });
    }, []);

    const handlChangeLan = lan => {
        intl.getInitOptions().currentLocale = lan;
        setlanType(lan);
    }

    return (
        lanInitDone &&
        <>
            <HeaderView changeLan={handlChangeLan} />
        </>
    );
}

export default Header;