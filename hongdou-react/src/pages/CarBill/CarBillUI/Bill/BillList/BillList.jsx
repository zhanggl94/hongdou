import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { Table, Button, Modal } from 'antd';
import BillDetail from '../BillDetail/BillDetail';
import { getColumns } from '../billUtil';

const BillList = props => {

    const [modalVisible, setModalVisible] = useState(false)

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

    const handleCreateBillDetail = () => {
        openModal();
    }

    /**
     * OK事件
     */
    const handleOk = () => {
        closeModal();
    }

    /**
     * 取消事件
     */
    const handleCancel = () => {
        closeModal();
    }

    const openModal = () => {
        setModalVisible(true);
    }

    /**
     * 关闭模态窗口
     */
    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <>
            <div>
                <Button onClick={handleCreateBillDetail}>{intl.get('BillList_lbl_create')}</Button>
            </div>
            <div>
                <Table dataSource={dataSource} columns={getColumns()} />
                <Modal title={intl.get('BillList_lbl_title')} width={'100%'} visible={modalVisible}
                    onOk={handleOk} onCancel={handleCancel}>
                    <BillDetail />
                </Modal>
            </div>
        </>
    );
}

export default BillList;