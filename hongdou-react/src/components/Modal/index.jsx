import React, { useImperativeHandle, useState } from 'react';
import { Modal } from 'antd';
import Search from '../Search/Search';

const ModalComponent = props => {

    const [modalVisible, setModalVisible] = useState(false);

    useImperativeHandle(props.cRef, () => ({
        openModal,
        closeModal
    }));

    /**
     * OK按钮事件
     */
    const handleOk = () => {
        closeModal();
    }

    /**
     * Cancel按钮事件
     */
    const handleCancel = () => {
        closeModal();
    }

    /**
     * 打开窗口
     */
    const openModal = () => {
        setModalVisible(true);
    }

    /**
     * 关闭窗口
     */
    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <Modal width={'80%'} visible={modalVisible} maskClosable={false}
            onOk={handleOk} onCancel={handleCancel}>
            <Search columns={props.columns} />
        </Modal>
    );
}

export default ModalComponent;