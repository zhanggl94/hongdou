import base from '../api/base';
import { getData, postData } from '../utils/http';

export default {
    searchCar: data => {
        return postData(base.searchCarBill, data);
    },
    createCar: data => {
        return postData(base.createCar, data);
    }
}