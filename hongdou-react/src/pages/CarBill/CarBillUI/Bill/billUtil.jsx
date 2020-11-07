import React from 'react';
import intl from 'react-intl-universal';

/**
 * 输出账单列表的表格列名
 * @param {*} props 
 */
export const getColumns = (props) => {
    return [{
        title: intl.get('CarDetail_lbl_name'), // 汽车名
        dataIndex: 'carName',
        key: 'carName',

    }, {
        title: intl.get('BillList_lbl_date'), // 日期
        dataIndex: 'date',
        key: 'date',
    }, {
        title: intl.get('BillList_lbl_bill_type'), // 账单种类
        dataIndex: 'billType',
        key: 'billType',
    }, {
        title: intl.get('BillList_lbl_actual'), // 实际花费金额
        dataIndex: 'actual',
        key: 'actual',
    }, {
        title: intl.get('BillList_lbl_discount'), // 优惠金额
        dataIndex: 'discount',
        key: 'discount',
    }, {
        title: intl.get('BillList_lbl_total'), // 总金额
        dataIndex: 'total',
        key: 'total',
    }, {
        title: intl.get('BillList_lbl_pay_type'), // 支付方式
        dataIndex: 'payType',
        key: 'payType',
    }, {
        title: intl.get('BillList_lbl_unit_price'), // 单价
        dataIndex: 'unitPrice',
        key: 'unitPrice',
    }];
}