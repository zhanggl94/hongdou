import React, { useContext, useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import { Input, DatePicker, Select, InputNumber } from 'antd';
import { getBillTypeMap, getPayTypeMap } from '../billUtil';
import './style.less';
import ModalComponent from '../../../../../components/Modal';
import { getColumns as carColumns, searchCarQuest } from '../../Car/carUtil';
import { openNotification } from '../../../../../utils/util';
import constants from '../../../../../utils/constants';
import CommonProps from '../../../../../components/HOC/CommonProps';
import QueryParam from '../../../../../modle/QueryParam';
import CommonContext from '../../../../../components/CommonContext';

const { Search } = Input;
const { Option } = Select;

const BillDetail = props => {
    let parentDetailInfo = useContext(CommonContext);
    const searchRef = useRef();
    const currUserId = props.auth.currentUser.userid;
    const [searchCarInfo, setSearchCarInfo] = useState(null);
    const [billDetail, setBillDetail] = useState(parentDetailInfo);
    
    useEffect(() => {
        parentDetailInfo = Object.assign(parentDetailInfo, billDetail);
    }, [billDetail]);

    /**
     * 获取汽车信息(API请求)
     * @param {*} data 
     */
    const getSearchCarInfo = async data => {
        const result = await searchCarQuest(data);
        try {
            if (result.isOk) {
                setSearchCarInfo(result.data.map(item => { item.key = item.id; return item }));
            } else {
                openNotification({
                    type: constants.notifiction.type.warning,
                    message: result.message
                });
            }
        } catch (error) {
            console.error(error);
            openNotification({
                type: constants.notifiction.type.error,
                message: error.message
            });
        }
    }

    /**
     * 检索汽车信息
     * @param {*} id 
     */
    const handleCarSearch = async () => {
        if (searchRef.current) {
            searchRef.current.openModal();
            await getSearchCarInfo(
                new QueryParam([{ key: 'userId', value: currUserId }])
            );
        }
    }

    /**
     * 查询页面关闭后的回调事件
     * @param {*} carInfo 汽车信息
     */
    const handleCloseModal = carInfo => {
        handleFormChange('carInfo', '', carInfo);
    }

    /**
     * 日期控件变更回调事件
     * @param {*} date 
     * @param {*} dateStr 
     */
    const handleDateChange = (date, dateStr) => {
        handleFormChange('DatePicker', '', { date, dateStr });
    }

    /**
     * 账单详情内容变更
     * @param {*} data 数据
     * @param {*} name 对象key
     * @param {*} type 类型
     */
    const handleFormChange = (type, name, data) => {
        let changeElement;
        switch (type) {
            case 'carInfo':
                changeElement = { 'carInfo': data };
                break;
            case 'DatePicker':
                changeElement = { 'date': data.dateStr };
                break;
            case 'Select':
                changeElement = { [name]: data };
                break;
            case 'InputNumber':
                changeElement = { [name]: data, 'total': billDetail.actual + billDetail.discount };
                break;
            case 'Input':
                changeElement = { [data.target.name]: data.target.value };
                break;
        }
        setBillDetail({ ...billDetail, ...changeElement });
    }

    return (
        <>
            <div className='bill_container'>
                <div className='row'>
                    {/* 汽车名 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_carName')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <Search placeholder={intl.get('BillDetail_lbl_carName_placeholder')} value={billDetail.carInfo.name} onSearch={handleCarSearch} enterButton />
                    </div>
                    {/* 日期 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_date')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <DatePicker name='date' onChange={handleDateChange.bind(this)} />
                    </div>
                </div>
                <div className='row'>
                    {/* 账单种类 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_bill_type')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <Select name='billType' style={{ width: '100%' }} defaultValue={billDetail.billType} onChange={handleFormChange.bind(this, 'Select', 'billType')}>
                            {Array.from(getBillTypeMap()).map(item => (
                                <Option key={item[0]} value={item[0]}>{item[1]}</Option>
                            ))}
                        </Select>
                    </div>
                    {/* 支付方式 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_pay_type')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <Select name='payType' style={{ width: '100%' }} onChange={handleFormChange.bind(this, 'Select', 'payType')} mode="multiple">
                            {Array.from(getPayTypeMap()).map(item => (
                                <Option key={item[0]} value={item[0]}>{item[1]}</Option>
                            ))}
                        </Select>
                    </div>
                </div >
                <div className='row'>
                    {/* 实际花费金额 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_actual')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <InputNumber name='actual' defaultValue={billDetail.actual} onChange={handleFormChange.bind(this, 'InputNumber', 'actual')} />
                    </div>
                    {/* 优惠金额 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_discount')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <InputNumber name='discount' defaultValue={billDetail.discount} onChange={handleFormChange.bind(this, 'InputNumber', 'discount')} />
                    </div>
                </div>
                <div className='row'>
                    {/* 总金额 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_total')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <InputNumber name='total' value={billDetail.total} disabled={true} />
                    </div>
                    {/* 单价 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_unit_price')}：</span>
                    </div>
                    <div className='textLeft width_25_per'>
                        <InputNumber name='unitPrice' defaultValue={billDetail.unitPrice} onChange={handleFormChange.bind(this, 'InputNumber', 'unitPrice')} />
                    </div>
                </div>
                <div className='row'>
                    {/* 地点 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_place')}：</span>
                    </div>
                    <div className='textLeft width_75_per'>
                        <Input name='place' defaultValue={billDetail.place} onChange={handleFormChange.bind(this, 'Input', 'place')} />
                    </div>
                </div>
                <div className='row'>
                    {/* 备注 */}
                    <div className='textRight width_25_per'>
                        <span>{intl.get('BillDetail_lbl_note')}：</span>
                    </div>
                    <div className='textLeft width_75_per'>
                        <Input.TextArea name='note' rows={5} defaultValue={billDetail.note} onChange={handleFormChange.bind(this, 'Input', 'note')} />
                    </div>
                </div>
            </div >
            <ModalComponent cRef={searchRef} columns={carColumns({ hideOperate: true })} dataSource={searchCarInfo} closeCallback={handleCloseModal} />
        </>
    );
}

export default CommonProps(BillDetail);