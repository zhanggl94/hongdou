import React from 'react';
import intl from 'react-intl-universal';
import CarList from './CarList/CarList';
import { getBrand, getDefault } from '../../../../utils/carUtil';
import { Space } from 'antd';

const Car = () => {

    const columns = [
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
            dataIndex: 'default',
            key: 'default',
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
    ];

    const data = [
        {
            id: '1',
            name: '丰田-雷凌',
            brand: 0,
            default: true,
            note: '我的车'
        },
        {
            id: '2',
            name: '本田-雅阁',
            brand: 1,
            default: false,
            note: '我的车1'
        }
    ];
    console.log('columns', columns)
    return (
        <CarList columns={columns} data={data} />
    );
}

export default Car;