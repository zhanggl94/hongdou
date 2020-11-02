import { Checkbox, Col, Input, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import intl from 'react-intl-universal';
import * as carUtil from '../../../../../utils/carUtil';
import './style.less';

const CarDetail = props => {

    const handleInputChange = e => {
        props.getCarInfo(e.target.name, e.target.value);
    }

    const handleSelectChange = value => {
        props.getCarInfo('brand', value);
    }

    const handleCheckBoxChange = e => {
        props.getCarInfo('idDefault', e.target.checked ? 1 : 0);
    }

    const { Option } = Select;
    return (
        <>
            <Row className='row-center'>
                <Col span={8} className='text-right'>{intl.get('CarDetail_lbl_name')}:</Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Input name='name' type='text' onChange={handleInputChange} />
                </Col>
                <Col span={2}></Col>
            </Row>
            <Row className='row-center'>
                <Col span={8} className='text-right'>{intl.get('CarDetail_lbl_brand')}:</Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Select style={{ width: '100%' }} onChange={handleSelectChange}>
                        {carUtil.brandList.map(item => (
                            <Option key={item} value={item}>{carUtil.getBrand(item)}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={2}></Col>
            </Row>
            <Row className='row-center'>
                <Col span={8} className='text-right'>{intl.get('CarDetail_lbl_default')}:</Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Checkbox onChange={handleCheckBoxChange} />
                </Col>
                <Col span={2}></Col>
            </Row>
            <Row className='row-center'>
                <Col span={8} className='text-right'>{intl.get('CarDetail_lbl_note')}:</Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <TextArea rows={4} name='note' onChange={handleInputChange} />
                </Col>
                <Col span={2}></Col>
            </Row>
        </>
    );
}

export default CarDetail;