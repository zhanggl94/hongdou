import base from '../api/base';
import { getData } from '../utils/http';

export default {
    searchRequest: () => {
        return getData(base.searchCarBill, true);
    }
}