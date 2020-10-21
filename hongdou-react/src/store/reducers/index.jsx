import { combineReducers } from 'redux';
import loadingStatus from './loadingReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
    loadingStatus,
    auth
});

export default rootReducer;