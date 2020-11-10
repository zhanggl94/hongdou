import React from 'react';
import { Space } from 'antd';
import intl from 'react-intl-universal';

export const brandMap = new Map()
    // .set(0, intl.get('CarList_lbl_brand_toyota')) //丰田
    // .set(1, intl.get('CarList_lbl_brand_honda'))//本田
    // .set(2, intl.get('CarList_lbl_brand_volkswagen'))//大众
    // .set(3, intl.get('CarList_lbl_brand_chevrolet'))//雪佛兰
    // .set(9999, intl.get('CarList_lbl_brand_unknow'))//未知
    .set(0, '丰田') //丰田
    .set(1, '本田')//本田
    .set(2, '大众')//大众
    .set(3, '雪佛兰')//雪佛兰
    .set(9999, '未知')//未知

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
            render: brand => brandMap.get(brand)
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