import { combineReducers } from 'redux';
import loadingStatus from './loadingReducer';

const rootReducer = combineReducers({
    loadingStatus
});

export default rootReducer;