import base from './base';
import { getData, postData } from '../utils/http';

const carRequest = {
    search: data => {
        return postData(base.searchCar, data);
    },
    create: data => {
        return postData(base.createCar, data);
    },
    edit: data => {
        return postData(base.editCar, data);
    },
    delete: data => {
        return postData(base.deleteCar, data);
    }
};
export default carRequest;