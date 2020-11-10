import React from 'react';
import intl from 'react-intl-universal';
import { Input, DatePicker, Select, InputNumber } from 'antd';
import { billTypeMap, getBillType, payTypeMap } from '../billUtil';
import './style.less';

const { Search } = Input;
const { Option } = Select;

const handleSearch = id => {
    alert('search')
}

const handleChange = () => {

}

const BillDetail = (props) => {
    return (
        <div className='bill_container'>
            <div className='row'>
                {/* 汽车名 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_carName')}：</span>
                </div>
                <div className='textLeft width_25_per'>
                    <Search placeholder={intl.get('BillDetail_lbl_carName_placeholder')} onSearch={handleSearch} enterButton />
                </div>
                {/* 日期 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_date')}：</span>
                </div>
                <div className='textLeft width_25_per'>
                    <DatePicker onChange={handleChange} />
                </div>
            </div>
            <div className='row'>
                {/* 账单种类 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_bill_type')}：</span>
                </div>
                <div className='textLeft width_25_per'>
                    <Select style={{ width: '100%' }}>
                        {Array.from(billTypeMap).map(item => (
                            <Option key={item[0]} value={item[0]}>{item[1]}</Option>
                        ))}
                    </Select>
                </div>
                {/* 支付方式 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_pay_type')}：</span>
                </div>
                <div className='textLeft width_25_per'>
                    <Select style={{ width: '100%' }} mode="multiple">
                        {Array.from(payTypeMap).map(item => (
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
                    <InputNumber />
                </div>
                {/* 优惠金额 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_discount')}：</span>
                </div>
                <div className='textLeft width_25_per'>
                    <InputNumber />
                </div>
            </div>
            <div className='row'>
                {/* 总金额 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_total')}：</span>
                </div>
                <div className='textLeft width_25_per'>
                    <InputNumber disabled={true} />
                </div>
                {/* 单价 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_unit_price')}：</span>
                </div>
                <div className='textLeft width_25_per'>
                    <InputNumber />
                </div>
            </div>
            <div className='row'>
                {/* 地点 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_place')}：</span>
                </div>
                <div className='textLeft width_75_per'>
                    <Input />
                </div>
            </div>
            <div className='row'>
                {/* 备注 */}
                <div className='textRight width_25_per'>
                    <span>{intl.get('BillDetail_lbl_note')}：</span>
                </div>
                <div className='textLeft width_75_per'>
                    <Input.TextArea rows={5} />
                </div>
            </div>
        </div >
    );
}

export default BillDetail;