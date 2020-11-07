import { Table } from 'antd';
import React from 'react';
import { getColumns } from '../billUtil';

const BillList = props => {

    const dataSource = [{
        key: '1',
        carName: '丰田',
        date: '2020/10/1',
        billType: '加油',
        actual: 300,
        discount: 0,
        total: 300,
        payType: '微信支付',
        unitPrice: 5.9
    }];



    return (
        <>
            <div>
                <Table dataSource={dataSource} columns={getColumns()} />
            </div>
        </>
    );
}

export default BillList;