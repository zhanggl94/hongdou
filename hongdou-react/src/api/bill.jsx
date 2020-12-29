import { postData } from "../utils/http";
import base from "./base";

const billRequest = {
    search: data => postData(base.searchBill, data),
    create: data => postData(base.createBill, data),
    edit: data => postData(base.editBill, data),
    delete: data => postData(base.deleteBill, data),
    import: data => postData(base.importBill, data)
};
export default billRequest;