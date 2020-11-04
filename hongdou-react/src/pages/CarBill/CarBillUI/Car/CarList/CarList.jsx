import React, { useEffect, useState, createContext } from 'react';
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
import CommonContext from '../../../../../components/CommonContext';
import spinLoading from '../../../../../store/actions/loadingAciton';

const CarList = (props) => {
    const DetailInfoContext = CommonContext; // context传递上下文
    const userId = new QueryParam({ key: 'userId', value: props.currentUser.userid }); // 用户Id
    const currentOperation = { type: '', lbl: '' }; // 进行的操作
    const [carList, setCarList] = useState(null); // 汽车列表
    const [detailInfo, setDetailInfo] = useState({ // 汽车详细信息
        name: '',
        brand: 0,
        isDefault: 0,
        note: '',
        userId: props.currentUser.userid
    });

    //页面初期化时，加载汽车列表
    useEffect(() => {
        searchAllCar([userId]);
    }, []);

    const [modalVisible, setModalVisible] = useState(false); // 模态窗口的显示标志

    /**
     * 显示模态窗口
     */
    const showModal = () => {
        setModalVisible(true);
    }

    /**
     * 隐藏模态窗口
     */
    const hideModal = () => {
        setModalVisible(false);
    }

    /**
     * 模态窗口OK按钮点击
     */
    const handleOK = () => {
        console.log('curr',currentOperation)
        if (constants.operation.create === currentOperation.type) {
            createCarRequest(detailInfo);
        } else if (constants.operation.update === currentOperation.type) {
        }
        console.log('id',detailInfo)
        editCarQuest(detailInfo.id);
        hideModal();
    }

    /**
     * 模态窗口Cacnel按钮点击
     */
    const handleCancel = () => {
        hideModal();
    }

    /**
     * 清空carInfo
     */
    const clearCarInfo = () => {
        setDetailInfo({
            name: '',
            brand: 0,
            isDefault: 0,
            note: '',
            userId: props.currentUser.userid
        });
    }

    /**
     * 创建汽车信息
     */
    const createCarInfo = () => {
        currentOperation.type = constants.operation.create; // create操作
        currentOperation.lbl = intl.get('CarList_lbl_btn_create'); // 新建
        showModal();
        clearCarInfo();
    }

    /**
     * 查找全部汽车信息
     */
    const searchAllCar = async params => {
        props.spinLoading(true);
        try {
            const data = await searchCarQuest(params);
            if (data.isOk) {
                if (data.data?.length) {
                    setCarList(data.data.map(item => { item.key = item.id; return item }));
                } else {
                    setCarList(null);
                }
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

    /**
     * 编辑汽车信息
     * @param {*} record 
     */
    const editCar = async record => {
        currentOperation.type=constants.operation.update;
        currentOperation.lbl=intl.get('CarList_lbl_edit');
        const queryParams = new QueryParam({ key: 'id', value: record.id });
        detailInfo.id = record.id;
        const paramList = [];
        paramList.push(queryParams);
        spinLoading(true);
        try {
            const data = await searchCarQuest(paramList);
            if (data.isOk) {
                spinLoading(false);
                showModal();
                setDetailInfo({
                    name: data.data[0].name,
                    brand: data.data[0].brand,
                    isDefault: data.data[0].isDefault,
                    note: data.data[0].note,
                    userId: data.data[0].userId
                });
            } else {
                openNotification({
                    type: constants.notifiction.warning,
                    messaage: data.message
                })
            }
        } catch (error) {
            openNotification({
                type: constants.notifiction.error,
                messaage: error.message
            })
        }
        spinLoading(false);

    }

    /**
     * 更新汽车信息
     * @param {*} id 
     */
    const editCarQuest = id => {
        spinLoading(true);
        api.carBill.editCar(id)
            .then(data => {
                spinLoading(false);
                if (data.isOk) {
                    openNotification({
                        type: constants.notifiction.type.success,
                        message: intl.get('CarList_msg_update_success')
                    });
                    searchAllCar([userId]);
                } else {
                    openNotification({
                        type: constants.notifiction.type.warning,
                        message: intl.get('CarList_msg_update_failed') + data.message
                    });
                }
            }).catch(error => {
                spinLoading(false);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('CarList_msg_update_failed') + error.message
                });
                console.log(error);
            });
    }

    /**
     * 创建汽车信息
     * @param {*} data 
     */
    const createCarRequest = data => {
        props.spinLoading(true);
        data.userId = props.currentUser.userid;
        api.carBill.createCar(data)
            .then(data => {
                props.spinLoading(false);
                if (data.isOk) {
                    openNotification({
                        type: constants.notifiction.type.success,
                        message: intl.get('CarList_msg_create_success')
                    });
                    searchAllCar([userId]);
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


    const deleteCar = id => {
        props.spinLoading(true);
        api.carBill.deleteCar({ id })
            .then(data => {
                props.spinLoading(false);
                if (data.isOk) {
                    openNotification({
                        type: constants.notifiction.type.success,
                        message: intl.get('CarList_msg_delete_success')
                    });
                    searchAllCar([userId]);
                } else {
                    openNotification({
                        type: constants.notifiction.type.warning,
                        message: intl.get('CarList_msg_delete_failed') + data.message
                    });
                }
            })
            .catch(error => {
                props.spinLoading(false);
                openNotification({
                    type: constants.notifiction.type.error,
                    message: intl.get('CarList_msg_delete_failed') + error.message
                });
                console.error(error);
            });
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
                    <a onClick={deleteCar.bind(this, record.id)}>{intl.get('CarList_lbl_delete')}</a>
                </Space>
            )
        }
    ]

    return (
        <>
            <div>
                <Button onClick={createCarInfo}>{intl.get('CarList_lbl_btn_create')}</Button>
            </div>

            <Table columns={columns} dataSource={carList} />

            <Modal visible={modalVisible} maskClosable={false}
                // TODO: title的文字更新
                title={intl.get('CarList_lbl_title', { param: currentOperation.lbl })}
                onOk={handleOK} onCancel={handleCancel}
                footer={[
                    <Button type='primary' key='ok' onClick={handleOK}>{intl.get('CarList_lbl_btn_ok')}</Button>,
                    <Button key='return' onClick={handleCancel}>{intl.get('CarList_lbl_btn_cancel')}</Button>
                ]}>
                {/* <CarDetail getCarInfo={getCarInfo} detailCarInfo={detailCarInfo} /> */}
                <DetailInfoContext.Provider value={detailInfo}>
                    <CarDetail />
                </DetailInfoContext.Provider>
            </Modal>
        </>
    );
}

export default CommonProps(CarList);