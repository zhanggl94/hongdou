import { postData } from '../utils/http';
import base from './base';
const signupRequest = data => postData(base.signin, data);
export default signupRequest;