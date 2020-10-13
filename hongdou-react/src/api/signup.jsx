import { getData, postData } from '../utils/http';
import base from './base';
const signupRequest = data => postData(base.baseurl + base.signup, data);
export default signupRequest;