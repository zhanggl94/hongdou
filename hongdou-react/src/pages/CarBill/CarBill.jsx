import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import constants from '../../utils/constants';
import Bill from './CarBillUI/Bill/Bill';
import Car from './CarBillUI/Car/Car';
import CarBillUI from './CarBillUI/CarBillUI';

const CarBill = props => {
    const [content, setContent] = useState();

    const handleMenuItemClick = component => {
        console.log('component',component)
        switch (component) {
            case constants.component_car:
                setContent(<Car />);
                break;
            case constants.component_bill:
                setContent(<Bill />);
                break;
        }
    }

    return (
        <CarBillUI handleMenuItemClick={handleMenuItemClick} content={content} />
    );
}

export default withRouter(CarBill);