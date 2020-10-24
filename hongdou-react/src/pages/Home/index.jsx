import React from 'react';
import { CarTwoTone } from '@ant-design/icons';

import './style.less';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='container'>
            <ul class='anticons-list'>
                <li className='TwoTone'>
                    <Link to='/carbill'>
                        <CarTwoTone />
                        <span className='anticon-class'>
                            <span className='ant-badge'>CarBill</span>
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
export default Home;