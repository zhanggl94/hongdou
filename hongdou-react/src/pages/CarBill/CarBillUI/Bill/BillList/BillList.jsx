import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Table, Button, Modal } from 'antd';
import BillDetail from '../BillDetail/BillDetail';
import { getColumns } from '../billUtil';
import CommonContext from '../../../../../components/CommonContext';
import BillDetailModle from '../../../../../modle/BillDetailModle';
import api from '../../../../../api';
import { openNotification } from '../../../../../utils/util';
import constants from '../../../../../utils/constants';
import CommonProps from '../../../../../components/HOC/CommonProps';
import QueryParam from '../../../../../modle/QueryParam';

const BillList = props => {
    const DetailInfoContext = CommonContext;
    const currUserId = props.auth.currentUser.userid; // 当前用户Id
    const billDetailModle = new BillDetailModle();
    billDetailModle.userId = props.auth.currentUser.userid;
    const [modalVisible, setModalVisible] = useState(false)
    const [detailInfo, setDetailInfo] = useState(billDetailModle);
    const [billList, setBillList] = useState(null);

    // const dataSource = [{
    //     key: '1',
    //     carName: '丰田',
    //     date: '2020/10/1',
    //     billType: '加油',
    //     actual: 300,
    //     discount: 0,
    //     total: 300,
    //     payType: '微信支付',
    //     unitPrice: 5.9
    // }];

    /**
     * 页面初始化表格
     */
    useEffect(() => {
        searchBillRequest(new QueryParam([{ key: 'userId', value: currUserId }]));
    }, []);

    const handleCreateBillDetail = () => {
        openModal();
    }

    /**
     * OK事件
     */
    const handleOk = () => {
        createBillRequest();
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

    /**
     * 查询账单信息
     * @param {*} paramList 
     */
    const searchBillRequest = async (paramList) => {
        props.spinLoading(true);
        try {
            const result = await api.billRequest.search(paramList);
            if (result.isOk) {
                if (result.data?.length) {
                    console.log('query data:',result.data)
                    setBillList(result.data);
                } else {
                    setBillList(null);
                }
            } else {
                openNotification({ type: constants.notifiction.type.warning, message: intl.get('BillList_msg_search_failed') + result.message });
            }
        } catch (error) {
            console.error(error);
            openNotification({ type: constants.notifiction.type.error, message: intl.get('BillList_msg_search_failed')});
        }
        props.spinLoading(false);
    }

    /**
     * 新建账单
     */
    const createBillRequest = async () => {
        props.spinLoading(true);
        try {
            const result = await api.billRequest.create(detailInfo);
            let message = result.message;
            let messageType = intl.get('BillList_msg_create_failed');
            if (result.isOk) {
                message = intl.get('BillList_msg_create_success');
                messageType = constants.notifiction.type.success;
            }
            openNotification({ type: messageType, message });
        } catch (error) {
            openNotification({ type: constants.notifiction.type.error, message: error.message });
        }
        props.spinLoading(false);
    }

    return (
        <>
            <div>
                <Button onClick={handleCreateBillDetail}>{intl.get('BillList_lbl_create')}</Button>
            </div>
            <div>
                <Table dataSource={billList} columns={getColumns()} />
                <Modal title={intl.get('BillList_lbl_title')} width={'100%'} visible={modalVisible}
                    onOk={handleOk} onCancel={handleCancel}>
                    <DetailInfoContext.Provider value={detailInfo}>
                        <BillDetail />
                    </DetailInfoContext.Provider>
                </Modal>
            </div>
        </>
    );
}

export default CommonProps(BillList);