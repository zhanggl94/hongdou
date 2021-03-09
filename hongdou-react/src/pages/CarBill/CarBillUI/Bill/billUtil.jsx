import React from 'react';
import { Space } from 'antd';
import intl from 'react-intl-universal';
import api from '../../../../api';

/**
 * 输出账单列表的表格列名
 * @param {*} props 
 */
export const getColumns = (props) => {
    const columns = [{
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

    const operate = {
        title: intl.get('BillList_lbl_action'), // 操作
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
            <Space size='middle'>
                <a onClick={props.editBill.bind(this, record.id)}>{intl.get('BillList_lbl_edit')}</a>
                <a onClick={props.deleteBill.bind(this, record.id)}>{intl.get('BillList_lbl_delete')}</a>
            </Space>
        )
    };

    if (!props.hideOperate) {
        columns.push(operate);
    }
    return columns;
}

/**
 * 汽车账单类型
 */
export const getBillTypeMap = () => {
    return new Map()
        .set(1, '裸车')
        .set(2, '车险')
        .set(3, '购置税')
        .set(4, '上牌')
        .set(5, '加油')
        .set(6, '停车费')
        .set(7, '洗车')
        .set(8, '轮渡车票')
        .set(9, '维修')
        .set(10, '保养')
        .set(11, '交通违章')
        .set(999, '其他');
}

/**
 * 汽车支付类型
 */
export const getPayTypeMap = () => {
    return new Map()
        .set(1, '微信')
        .set(2, '支付宝')
        .set(3, '银联云闪付')
        .set(4, '刷卡')
        .set(5, '丰云行APP')
        .set(6, '停车券')
        .set(7,'滴滴加油')
        .set(8, '12123APP')
        .set(999, '其他');
}

/**
 * 账单导出的Excel表头
 */
export const getExlceHeaders = () => {
    return [{
        title: '汽车名',
        dataIndex: 'carName',
        key: 'carName',
        className: 'text-monospace'
    }, {
        title: '账单日期',
        dataIndex: 'date',
        key: 'date',
        className: 'text-monospace'
    }, {
        title: '账单类别',
        dataIndex: 'billType',
        key: 'billType',
        className: 'text-monospace'
    }, {
        title: '付款方式',
        dataIndex: 'payType',
        key: 'payType',
        className: 'text-monospace'
    }, {
        title: '实际花费',
        dataIndex: 'actual',
        key: 'actual',
        className: 'text-monospace'
    }, {
        title: '优惠',
        dataIndex: 'discount',
        key: 'discount',
        className: 'text-monospace'
    }, {
        title: '总金额',
        dataIndex: 'total',
        key: 'total',
        className: 'text-monospace'
    }, {
        title: '单价',
        dataIndex: 'unitPrice',
        key: 'unitPrice',
        className: 'text-monospace'
    }, {
        title: '地点',
        dataIndex: 'place',
        key: 'place',
        className: 'text-monospace'
    }, {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
        className: 'text-monospace'
    }];
}