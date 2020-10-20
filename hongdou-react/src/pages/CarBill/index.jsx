import React from 'react';
import CarBillView from './CarBillView';
import api from '../../api';

const CarBill = () => {

    api.carBill.searchRequest().then(data => {
        console.log('returndata', data);
    }).then(error => {
        console.log(error);
    })

    return (
        <CarBillView />
    );
}

export default CarBill;