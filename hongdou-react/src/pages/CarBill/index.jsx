import React from 'react';
import CarBillView from './CarBillView';
import api from '../../api';
import { openNotification } from '../../utils/util';
import constants from '../../utils/constants';

const CarBill = () => {

    api.carBill.searchRequest().then(data => {
        if (data.isOk) {
            console.log('carbill search success.');
        } else {
            openNotification({
                type: constants.notifiction.type.error,
                message: data.message
            })
        }
    }).catch(error => {
        console.log('error',error);
        openNotification({
            type: constants.notifiction.type.error,
            message: error.message
        })
    })

    return (
        <CarBillView />
    );
}

export default CarBill;