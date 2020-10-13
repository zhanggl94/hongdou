import { Button, Col, Row, Select } from 'antd';
import React from 'react';
import constants from '../../../utils/constants';
import './style.less';
import { getLabel } from '../../../utils/util';

const { Option } = Select;

const HeaderView = (props) => {
    const handleChangeLang = e => {
        props.changeLang(e);
    }

    return (
        <div className='header'>
            <Row>
                <Col span={18}></Col>
                <Col span={2}>
                    <Button size='small' href='/signin'>{getLabel('HeaderView').signin}</Button>
                </Col>
                <Col span={2}>
                    <Button size='small' href='/signup'>{getLabel('HeaderView').signup}</Button>
                </Col>
                <Col span={2}>
                    <Select defaultValue={constants.language.find(item => item.key === (localStorage.getItem('lang-type') || 'zh')).value}
                        onChange={handleChangeLang}>
                        {constants.language.map((item, index) =>
                            <Option key={index} value={item.key}>{item.value}</Option>
                        )}
                    </Select>
                </Col>
            </Row>
        </div>
    );
}

export default HeaderView;