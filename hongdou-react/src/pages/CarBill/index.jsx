import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import CarList from './Car/CarList';
import CarBillView from './CarBillView';

const CarBill = props => {
    const [content, setContent] = useState(<CarList />);

    const handleMenuItemClick = component => {
        console.log('component',component)
        switch (component) {
            default:
                setContent(<CarList />);
                break;
        }
    }

    console.log('carbill', props)
    return (
        <CarBillView handleMenuItemClick={handleMenuItemClick} content={content} />
    );
}

export default withRouter(CarBill);