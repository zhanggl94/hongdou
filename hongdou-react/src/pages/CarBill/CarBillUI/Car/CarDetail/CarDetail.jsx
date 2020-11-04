import { Checkbox, Col, Input, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState, useEffect, useContext } from 'react';
import intl from 'react-intl-universal';
import CommonContext from '../../../../../components/CommonContext';
import * as carUtil from '../../../../../utils/carUtil';
import './style.less';

const CarDetail = props => {
    const detailCarInfo = useContext(CommonContext);

    const [carInfo, setCarInfo] = useState({});

    useEffect(() => {
        console.log('carInfo', detailCarInfo);
    }, [detailCarInfo])

    console.log('detail',detailCarInfo);
    const handleFormChanged = (type, e) => {
        switch (type) {
            case 'Input':
                setCarInfo({ name: e.target.value, brand: carInfo.brand, isDefault: carInfo.isDefault, note: carInfo.note });
                detailCarInfo[e.target.name] = e.target.value;
                break;
            case 'Select':
                setCarInfo({ name: carInfo.name, brand: e, isDefault: carInfo.isDefault, note: carInfo.note });
                detailCarInfo.brand = e;
                break;
                case 'Checkbox':
                    setCarInfo({ name: carInfo.name, brand: carInfo.brand, isDefault: e.target.checked ? 1 : 0, note: carInfo.note });
                    detailCarInfo.isDefault = e.target.checked ? 1 : 0;
                break;
            case 'TextArea':
                setCarInfo({ name: carInfo.name, brand: carInfo.brand, isDefault: carInfo.isDefault, note: e.target.value });
                detailCarInfo.note = e.target.value;
                break;
        }
        // props.getCarInfo(carInfo);
    }

    const { Option } = Select;
    return (
        <>
            <Row className='row-center'>
                <Col span={8} className='text-right'>{intl.get('CarDetail_lbl_name')}:</Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Input name='name' type='text' onChange={handleFormChanged.bind(this, 'Input')} value={detailCarInfo.name} />
                </Col>
                <Col span={2}></Col>
            </Row>
            <Row className='row-center'>
                <Col span={8} className='text-right'>{intl.get('CarDetail_lbl_brand')}:</Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <Select style={{ width: '100%' }} onChange={handleFormChanged.bind(this, 'Select')} defaultValue={detailCarInfo.brand}>
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
                    <Checkbox onChange={handleFormChanged.bind(this, 'Checkbox')} checked={detailCarInfo.isDefault ? true : false} />
                </Col>
                <Col span={2}></Col>
            </Row>
            <Row className='row-center'>
                <Col span={8} className='text-right'>{intl.get('CarDetail_lbl_note')}:</Col>
                <Col span={2}></Col>
                <Col span={10}>
                    <TextArea rows={4} name='note' onChange={handleFormChanged.bind(this, 'TextArea')} value={detailCarInfo.note} />
                </Col>
                <Col span={2}></Col>
            </Row>
        </>
    );
}

export default CarDetail;