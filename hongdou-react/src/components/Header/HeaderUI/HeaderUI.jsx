import { Button, Select } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';
import { Link, withRouter } from 'react-router-dom';
import constants from '../../../utils/constants';
import './style.less';
import logURL from '../../../assest/images/logo.svg';

const { Option } = Select;

const HeaderUI = (props) => {
    const handleChangeLang = e => {
        props.changeLang(e);
    }

    const goToHome = e => {
        props.history.push('/');
    }

    let userOperation;
    if (props.auth.isAuth) {
        userOperation = (
            <>
                <span className='header-content'><Link to='/userinfo'>{props.auth.currentUser.username}</Link></span>
                <span className='header-content'><Button type='link' onClick={props.clearUser}>{intl.get('HeaderUI_lbl_signout')}</Button></span>
            </>
        );
    } else {
        userOperation = (
            <>
                <span className='header-content'><Button size='small' href='/signin'>{intl.get('HeaderUI_lbl_signin')}</Button></span>
                <span className='header-content'><Button size='small' href='/signup'>{intl.get('HeaderUI_lbl_signup')}</Button></span>
            </>
        );
    }

    return (
        <div className='header'>
            <div className='header-content'>
                <a onClick={goToHome}><img className='logo' src={logURL} alt='hongdou' /></a>
            </div>
            <div className='header-content'>
                {userOperation}
                <span className='header-content'>
                    <Select defaultValue={constants.language.find(item => item.key === (localStorage.getItem('lang-type') || 'zh')).value}
                        onChange={handleChangeLang}>
                        {constants.language.map((item, index) =>
                            <Option key={index} value={item.key}>{item.value}</Option>
                        )}
                    </Select>
                </span>
            </div>
        </div>
    );
}

export default withRouter(HeaderUI);