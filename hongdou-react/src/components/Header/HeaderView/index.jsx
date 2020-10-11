import { Select } from 'antd';
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';
import constants from '../../../util/constants';

const { Option } = Select;

const HeaderView = (props) => {
    const handleChangeLan = e => {
        props.changeLan(e);
        console.log(intl.get('LOGIN').USERNAME)
    }
    useEffect(()=>{
        console.log('view effect')
    })

    return (
        <div>
            <Select defaultValue={constants.language.find(item => item.key === 'zh').value}
                onChange={handleChangeLan}>
                {constants.language.map((item, index) =>
                    <Option key={index} value={item.key}>{item.value}</Option>
                )}
            </Select>
            {intl.get('LOGIN').USERNAME}
        </div>
    );
}

export default HeaderView;