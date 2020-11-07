import React from 'react';
import { Space } from 'antd';
import intl from 'react-intl-universal';

export const brandList = [0, 1, 2, 3, 9999];

export const getBrand = brand => {
    let carBrand = '';
    switch (brand) {
        case 0: //丰田田
            carBrand = intl.get('CarList_lbl_brand_toyota');
            break;
        case 1: //本田
            carBrand = intl.get('CarList_lbl_brand_honda');
            break;
        case 2: //大众
            carBrand = intl.get('CarList_lbl_brand_volkswagen');
            break;
        case 3: //雪佛兰
            carBrand = intl.get('CarList_lbl_brand_chevrolet');
            break;
        case 9999: //未知
            carBrand = intl.get('CarList_lbl_brand_unknow');
            break;
        default: //未知
            carBrand = intl.get('CarList_lbl_brand_unknow');
            break;
    }
    return carBrand;
}

export const getDefault = isDefault => isDefault ? '*' : '-';

export const getColumns = props => {
    return [
        {
            title: intl.get('CarList_lbl_name'), // 汽车名
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: intl.get('CarList_lbl_brand'), // 品牌
            dataIndex: 'brand',
            key: 'brand',
            render: brand => getBrand(brand)
        },
        {
            title: intl.get('CarList_lbl_default'), // 默认
            dataIndex: 'isDefault',
            key: 'isDefault',
            render: isDefault => getDefault(isDefault)
        },
        {
            title: intl.get('CarList_lbl_note'), // 备注
            dataIndex: 'note',
            key: 'note'
        },
        {
            title: intl.get('CarList_lbl_action'), // 操作
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Space size='middle'>
                    <a onClick={props.editCar.bind(this, record)}>{intl.get('CarList_lbl_edit')}</a>
                    <a onClick={props.deleteCar.bind(this, record.id)}>{intl.get('CarList_lbl_delete')}</a>
                </Space>
            )
        }
    ]
}