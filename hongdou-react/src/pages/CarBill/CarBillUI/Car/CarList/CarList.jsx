import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { Table, Modal, Button } from 'antd';
import CarDetail from '../CarDetail/CarDetail';

const CarList = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    }

    const hideModal = () => {
        setModalVisible(false);
    }

    const handleOK = () => {
        hideModal();
        console.log(carInfo)
    }

    const handleCancel = () => {
        hideModal();
        console.log('cancel clicked.')
    }

    const [carInfo, setCarInfo] = useState({});

    const getCarInfo = (key, value) => {
        if (carInfo && carInfo.hasOwnProperty(key)) {
            carInfo[key] = value;
        } else {
            carInfo[key] = value;
        }
        setCarInfo(carInfo);
    }

    return (
        <>
            <div>
                <Button onClick={showModal}>{intl.get('CarList_lbl_btn_create')}</Button>
            </div>

            <Table columns={props.columns} dataSource={props.data} />

            <Modal visible={modalVisible} maskClosable={false}
                title={intl.get('CarList_lbl_title', { param: 'tesst' })}
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

export default CarList;