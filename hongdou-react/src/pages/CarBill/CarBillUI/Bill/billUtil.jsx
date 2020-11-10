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

/**
 * 汽车账单类型
 */
export const billTypeMap = new Map()
    .set(0, '裸车')
    .set(1, '保险')
    .set(2, '购置税')
    .set(3, '上牌')
    .set(4, '加油')
    .set(5, '停车')
    .set(6, '维修')
    .set(7, '配件购买')
    .set(999, '其他')

export const payTypeMap = new Map()
.set(0,'微信')
.set(1,'支付宝')
.set(2,'银联云闪付')
.set(3,'刷卡')
.set(4,'丰云行APP')
.set(5,'停车券')
.set(999,'其他')