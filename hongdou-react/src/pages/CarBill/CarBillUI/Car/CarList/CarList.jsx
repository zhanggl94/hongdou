import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Table, Modal, Button } from 'antd';
import CarDetail from '../CarDetail/CarDetail';
import api from '../../../../../api'
import CommonProps from '../../../../../components/HOC/CommonProps';
import { openNotification } from '../../../../../utils/util';
import constants from '../../../../../utils/constants';
import common from './common';

const CarList = (props) => {

    const [carList, setCarList] = useState(null)

    //页面初期化时，加载汽车列表
    useEffect(() => {
        searchCar();
        console.log('common', common.columns)
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    }

    const hideModal = () => {
        setModalVisible(false);
    }

    const handleOK = () => {
        createCar(carInfo);
        hideModal();
        console.log(carInfo)
    }

    const handleCancel = () => {
        hideModal();
    }

    const [carInfo, setCarInfo] = useState({});

    /**
     * 获取子组件cardetail填写的内容
     * @param {*} key 
     * @param {*} value 
     */
    const getCarInfo = (key, value) => {
        if (carInfo && carInfo.hasOwnProperty(key)) {
            carInfo[key] = value;
        } else {
            carInfo[key] = value;
        }
        setCarInfo(carInfo);
    }

    /**
     * 创建汽车信息
     * @param {*} data 
     */
    const createCar = data => {
        props.spinLoading(true);
        api.carBill.createCar(data)
            .then(data => {
                props.spinLoading(false);
                if (data.isOk) {
                    openNotification({
                        type: constants.notifiction.type.success,
                        message: intl.get('CarList_msg_create_success')
                    });
                    searchCar();
                } else {
                    openNotification({
                        type: constants.notifiction.type.warning,
                        message: intl.get('CarList_msg_create_failed') + data.message
                    });
                    if (data.error) console.error(data.error);
                }
            }).catch(error => {
                props.spinLoading(false);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('CarList_msg_create_failed') + error.message
                });
                console.error(error);
            })
    }

    /**
     * 查询汽车信息
     * @param {*} data 
     */
    const searchCar = (data = null) => {
        props.spinLoading(true);
        api.carBill.searchCar(data)
            .then(data => {
                props.spinLoading(false);
                if (data.isOk) {
                    setCarList(data.data.map(item => { item.key = item.id; return item }));
                } else {
                    openNotification({
                        type: constants.notifiction.type.warning,
                        message: intl.get('CarList_msg_search_failed') + data.message
                    });
                }
            }).catch(error => {
                props.spinLoading(false);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('CarList_msg_search_failed') + error.message
                });
                console.error(error);
            });
    }

    return (
        <>
            <div>
                <Button onClick={showModal}>{intl.get('CarList_lbl_btn_create')}</Button>
            </div>

            <Table columns={common.columns} dataSource={carList} />

            <Modal visible={modalVisible} maskClosable={false}
                title={intl.get('CarList_lbl_title', { param: 'TODO' })}
                onOk={handleOK} onCancel={handleCancel}
                footer={[
                    <Button type='primary' key='ok' onClick={handleOK}>{intl.get('CarList_lbl_btn_ok')}</Button>,
                    <Button key='return' onClick={handleCancel}>{intl.get('CarList_lbl_btn_cancel')}</Button>
                ]}>
                <CarDetail getCarInfo={getCarInfo} />
            </Modal>
        </>
    );
}

export default CommonProps(CarList);