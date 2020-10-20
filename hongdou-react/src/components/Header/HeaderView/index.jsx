import { Button, Col, Row, Select } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import constants from '../../../utils/constants';
import { getJWTToken } from '../../../utils/util';
import './style.less';

const { Option } = Select;

const HeaderView = (props) => {
    const handleChangeLang = e => {
        props.changeLang(e);
    }

    let userOperation;
    if (getJWTToken()) {
        console.log('1',getJWTToken());
        userOperation = (
            <span className='header-conten'><Link to='/userinfo'>Username</Link></span>
        );
    } else {
        console.log('2',getJWTToken());
        userOperation = (
            <>
                <span className='header-content'><Button size='small' href='/signin'>{intl.get('HeaderView_lbl_signin')}</Button></span>
                <span className='header-content'><Button size='small' href='/signup'>{intl.get('HeaderView_lbl_signup')}</Button></span></>
        );
    }

    return (
        <div className='header'>
            <div className='header-content'>

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
            {/* <Row>
                <Col span={18}></Col>
                <Col span={2}>
                    <Button size='small' href='/signin'>{intl.get('HeaderView_lbl_signin')}</Button>
                </Col>
                <Col span={2}>
                    <Button size='small' href='/signup'>{intl.get('HeaderView_lbl_signup')}</Button>
                </Col>
                <Col span={2}>
                    <Select defaultValue={constants.language.find(item => item.key === (localStorage.getItem('lang-type') || 'zh')).value}
                        onChange={handleChangeLang}>
                        {constants.language.map((item, index) =>
                            <Option key={index} value={item.key}>{item.value}</Option>
                        )}
                    </Select>
                </Col>
            </Row> */}
        </div>
    );
}

export default HeaderView;