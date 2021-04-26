import { postData } from '../utils/http';
import base from './base';

const signinRequest = data => postData(base.signin, data);
export default signinRequest;