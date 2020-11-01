import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Table, Modal, Button } from 'antd';
import CarDetail from '../CarDetail/CarDetail';
import api from '../../../../../api'
import CommonProps from '../../../../../components/HOC/CommonProps';
import { openNotification } from '../../../../../utils/util';
import constants from '../../../../../utils/constants';
import { getBrand, getDefault } from '../../../../../utils/carUtil';
import { Space } from 'antd';
import QueryParam from '../../../../../modle/QueryParam';

const CarList = (props) => {

    const [carList, setCarList] = useState(null)

    //页面初期化时，加载汽车列表
    useEffect(() => {
        searchAllCar({});
    }, []);

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    }

    const hideModal = () => {
        setModalVisible(false);
    }

    const handleOK = () => {
        createCarRequest(carInfo);
        hideModal();
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
     * 查找全部汽车信息
     */
    const searchAllCar = async params => {
        props.spinLoading(true);
        try {
            const data = await searchCarQuest(params);
            if (data.isOk) {
                setCarList(data.data.map(item => { item.key = item.id; return item }));
            } else {
                openNotification({
                    type: constants.notifiction.type.warning,
                    message: intl.get('CarList_msg_search_failed') + data.message
                });
            }
            props.spinLoading(false);
        } catch (error) {
            props.spinLoading(false);
            openNotification({
                type: constants.notifiction.type.error,
                message: intl.get('CarList_msg_search_failed') + error.message
            });
            console.error(error);
            props.spinLoading(false);
        }
    }

    const editCar = async record => {
        showModal();
        const queryParams = new QueryParam({ key: 'id', value: record.id });
        const paramList = [];
        paramList.push(queryParams);
        const data = await searchCarQuest(paramList);
        console.log('data',data)
    }

    const editCarQuest = id => {

    }

    /**
     * 创建汽车信息
     * @param {*} data 
     */
    const createCarRequest = data => {
        props.spinLoading(true);
        api.carBill.createCar(data)
            .then(data => {
                props.spinLoading(false);
                if (data.isOk) {
                    openNotification({
                        type: constants.notifiction.type.success,
                        message: intl.get('CarList_msg_create_success')
                    });
                    searchAllCar({});
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
    const searchCarQuest = data => {
        return new Promise((resolve, reject) => {
            api.carBill.searchCar(data)
                .then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
        });
    }

    const columns = [
        {
            title: intl.get('CarList_lbl_name'), // 汽车名
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: intl.get('CarList_lbl_brand'), // 品牌
            dataIndex: 'brand',
            key: 'brand',
            render: brand => getBrand(brand)
        },
        {
            title: intl.get('CarList_lbl_default'), // 默认
            dataIndex: 'isDefault',
            key: 'isDefault',
            render: isDefault => getDefault(isDefault)
        },
        {
            title: intl.get('CarList_lbl_note'), // 备注
            dataIndex: 'note',
            key: 'note'
        },
        {
            title: intl.get('CarList_lbl_action'), // 操作
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Space size='middle'>
                    <a onClick={editCar.bind(this, record)}>{intl.get('CarList_lbl_edit')}</a>
                    <a href="">{intl.get('CarList_lbl_delete')}</a>
                </Space>
            )
        }
    ]

    return (
        <>
            <div>
                <Button onClick={showModal}>{intl.get('CarList_lbl_btn_create')}</Button>
            </div>

            <Table columns={columns} dataSource={carList} />

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