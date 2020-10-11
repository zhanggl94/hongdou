import { Col, Row, Select } from 'antd';
import React from 'react';
import constants from '../../../utils/constants';
import './style.less';

const { Option } = Select;

const HeaderView = (props) => {
    const handleChangeLang = e => {
        props.changeLang(e);
    }

    return (
        <div className='header'>
            <Row>
                <Col span={22}></Col>
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