import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Table, Button, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BillDetail from '../BillDetail/BillDetail';
import { getBillTypeMap, getColumns, getPayTypeMap, getExlceHeaders } from '../billUtil';
import CommonContext from '../../../../../components/CommonContext';
import BillDetailModle from '../../../../../modle/BillDetailModle';
import api from '../../../../../api';
import { openNotification, formatExcelDate, findMapKey } from '../../../../../utils/util';
import { importExcle, exportExcel } from '../../../../../utils/excelOperate';
import constants from '../../../../../utils/constants';
import CommonProps from '../../../../../components/HOC/CommonProps';
import QueryParam from '../../../../../modle/QueryParam';
import './style.less';

const BillList = props => {
    const DetailInfoContext = CommonContext;
    const currUserId = props.auth.currentUser.userid; // 当前用户Id
    let billDetailModle = new BillDetailModle();
    billDetailModle.userId = props.auth.currentUser.userid;
    const [modalVisible, setModalVisible] = useState(false); // 模态窗口显示/非显示
    const [detailInfo, setDetailInfo] = useState(billDetailModle); // 账单详细信息页面内容
    const [billList, setBillList] = useState(null); // 表格数据源
    const [currOperate, setCurrOperate] = useState({ type: '', lbl: '' }); // 进行的操作

    /**
     * 页面初始化表格
     */
    useEffect(() => {
        searchBillRequest(new QueryParam([{ key: 'userId', value: currUserId }]));
    }, []);

    const handleCreateBillDetail = () => {
        setCurrOperate({
            type: constants.operation.create, // create操作
            lbl: intl.get('BillList_lbl_btn_create') // 新建
        });
        clearDetailInfo();
        openModal();
    }

    /**
     * OK事件
     */
    const handleOk = async () => {
        if (currOperate.type === constants.operation.create) {
            await createBillRequest();
        } else if (currOperate.type === constants.operation.edit) {
            await updateBillRequest();
        }
        closeModal();
        searchBillRequest(new QueryParam([{ key: 'userId', value: currUserId }]));
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
     * 清除账单详细信息
     */
    const clearDetailInfo = () => {
        const clearBillDetail = new BillDetailModle();
        clearBillDetail.userId = currUserId;
        clearBillDetail.date = new Date().toLocaleDateString();
        setDetailInfo(clearBillDetail);
    }

    /**
     * 账单编辑
     */
    const editBill = (id) => {
        setCurrOperate({
            type: constants.operation.edit, // edit操作
            lbl: intl.get('BillList_lbl_btn_edit') // 新建
        });
        editBillRequest(new QueryParam([{ key: 'id', value: id }]));
    }

    /**
     * 账单删除
     * @param {*} id 
     */
    const deleteBill = async (id) => {
        await deleteBillRequest(id);
        searchBillRequest(new QueryParam([{ key: 'userId', value: currUserId }]));
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
                    updateBillList(result.data);
                } else {
                    updateBillList(null);
                }
            } else {
                openNotification({ type: constants.notifiction.type.warning, message: intl.get('BillList_msg_search_failed') + result.message });
            }
        } catch (error) {
            console.error(error);
            openNotification({ type: constants.notifiction.type.error, message: intl.get('BillList_msg_search_failed') });
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

    /**
     * 获取账单编辑页面的信息
     * @param {*} paramList 
     */
    const editBillRequest = async (paramList) => {
        props.spinLoading(true);
        try {
            const result = await api.billRequest.search(paramList);
            if (result.isOk) {
                if (result.data?.length) {
                    billDetailModle = result.data[0];
                    billDetailModle.carInfo = { id: '', name: '' };
                    billDetailModle.carInfo.id = result.data[0].carId;
                    billDetailModle.carInfo.name = result.data[0].carName;
                    billDetailModle.date = new Date(result.data[0].date).toLocaleDateString();
                    billDetailModle.payType = result.data[0].payType.split(',');
                    billDetailModle.total = result.data[0].actual + result.data[0].discount;
                    setDetailInfo(billDetailModle);
                    openModal();
                }
            } else {
                openNotification({ type: constants.notifiction.type.warning, message: intl.get('BillList_msg_search_failed') + result.message });
            }
        } catch (error) {
            console.error(error);
            openNotification({ type: constants.notifiction.type.error, message: intl.get('BillList_msg_search_failed') });
        }
        props.spinLoading(false);
    }

    /**
     * 账单更新
     */
    const updateBillRequest = async () => {
        props.spinLoading(true);
        let message = intl.get('BillList_msg_update_success');
        let messageType = constants.notifiction.type.success;
        try {
            const result = await api.billRequest.edit({ ...detailInfo });
            props.spinLoading(false);
            if (!result.isOk) {
                message = intl.get('BillList_msg_update_failed') + result.message;
                messageType = constants.notifiction.type.warning;
            }
        } catch (error) {
            messageType = constants.notifiction.type.error;
            message = intl.get('BillList_msg_update_failed') + error.message;
            console.error('error:', error);
        } finally {
            openNotification({ type: messageType, message });
        }
    }

    /**
     * 账单删除
     * @param {*} id 
     */
    const deleteBillRequest = async (id) => {
        props.spinLoading(true);
        let message = intl.get('BillList_msg_delete_success');
        let messageType = constants.notifiction.type.success;
        try {
            const result = await api.billRequest.delete({ id });
            props.spinLoading(false);
            if (!result.isOk) {
                message = intl.get('BillList_msg_delete_failed') + result.message;
                messageType = constants.notifiction.type.warning;
            }
        } catch (error) {
            messageType = constants.notifiction.type.error;
            message = intl.get('BillList_msg_delete_failed') + error.message;
            console.error('error:', error);
        } finally {
            openNotification({ type: messageType, message });
        }
    }

    /**
     * 更新账单信息
     */
    const updateBillList = data => {
        if (data) {
            data.map(item => {
                item.key = item.id; // 每条记录添加key值
                if (item.date?.length) { // 支取日期，去掉时间
                    item.date = new Date(item.date).toLocaleDateString();
                }
                if (item.billType) { // 解析账单类型
                    item.billType = getBillTypeMap().get(item.billType);
                }

                if (item.payType) { // 解析付款类型
                    const payTypeList = item.payType.split(',');
                    item.payType = '';
                    payTypeList.map(payType => (item.payType += getPayTypeMap().get(parseInt(payType)) + ';'))
                    item.payType = item.payType.slice(0, item.payType.length - 1);
                }
                item.total = item.actual + item.discount;
                return item;
            });
        }
        setBillList(data);
    }

    /**
     * Exlce文件上传
     * @param {*} param0 
     */
    const uploadExcel = ({ file, fileList }) => {
        importExcle(file, getExlceData)
    }

    /**
     * 获取Excle文件的内容
     * @param {*} data 
     */
    const getExlceData = async (data) => {
        props.spinLoading(true);
        if (data?.error) {
            openNotification({ type: constants.notifiction.type.error, message: intl.get('BillList_msg_import_get_data_failed') });
            console.error('Error', data.error);
        } else {
            data.data.map(item => {
                item.date = formatExcelDate(item.date);
                item.billType = findMapKey(getBillTypeMap(), item.billType);
                if (item.payType?.length) {
                    const payType = item.payType;
                    item.payType = '';
                    payType.split(',').map(
                        value => {
                            item.payType += findMapKey(getPayTypeMap(), value) + ',';
                        }
                    );
                    if (item.payType.endsWith(',')) {
                        item.payType = item.payType.slice(0, item.payType.length - 1);
                    }
                }
                item['userId'] = currUserId;
                return item;
            });

            try {
                const result = await api.billRequest.import(data.data);
                if (result.isOk) {
                    openNotification({ type: constants.notifiction.type.success, message: intl.get('BillList_msg_import_success') });
                    searchBillRequest(new QueryParam([{ key: 'userId', value: currUserId }]));
                } else {
                    openNotification({ type: constants.notifiction.type.warning, message: result.message });
                }
            } catch (error) {
                openNotification({ type: constants.notifiction.type.warning, message: intl.get('BillList_msg_import_failed') + error.message });
            }
            props.spinLoading(false);
        }
    }

    /**
     * 账单信息Excle下载
     */
    const downloadExcle = () => {
        exportExcel(getExlceHeaders(), billList, '汽车账单.xlsx');
    }

    return (
        <>
            <div className='btn_container'>
                <div className='btn'>
                    <Button onClick={handleCreateBillDetail}>{intl.get('BillList_lbl_create')}</Button>
                </div>
                <div className='btn'>
                    {/* <input type="file" mutiple="multiple" /> */}
                    <Upload customRequest={uploadExcel} showUploadList={false}>
                        <Button>
                            <UploadOutlined /> {intl.get('BillList_lbl_import')}
                        </Button>
                    </Upload>
                </div>
                <div className='btn'>
                    <Button onClick={downloadExcle}>{intl.get('BillList_lbl_export')}</Button>
                </div>
            </div>
            <div>
                <Table dataSource={billList} columns={getColumns({ editBill, deleteBill })} />
                <Modal title={intl.get('BillList_lbl_title', { param: currOperate.lbl })} width={'100%'} visible={modalVisible}
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