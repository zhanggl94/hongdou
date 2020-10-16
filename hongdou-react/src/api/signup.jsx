import { postData } from '../utils/http';
import base from './base';
const signupRequest = data => postData(base.signup, data);
export default signupRequest;