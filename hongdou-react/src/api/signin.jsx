import { postData } from '../utils/http';
import base from './base';
import signupRequest from './signup';

const signinRequest = data => postData(base.signin, data);
export default signupRequest;