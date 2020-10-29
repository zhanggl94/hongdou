import React from 'react';
import intl from 'react-intl-universal';
import { getBrand, getDefault } from '../../../../../utils/carUtil';
import { Space } from 'antd';

const common = {
    columns: [
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
            render: data => (
                <Space size='middle'>
                    <a href="">{intl.get('CarList_lbl_edit')}</a>
                    <a href="">{intl.get('CarList_lbl_delete')}</a>
                </Space>
            )
        }
    ]
};

export default common;