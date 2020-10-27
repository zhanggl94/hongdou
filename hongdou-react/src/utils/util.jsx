import { notification } from 'antd';
import constants from './constants';

/**
 * 打开通知框
 * @param {*} param0 
 */
export const openNotification = ({ type, message, placement }) => {
    console.log('open', message)
    const types = constants.notifiction.type;
    const placements = constants.notifiction.placement;
    const typeList = [types.success, types.info, types.warning, types.error];
    if (!typeList.find(item => item === type)) {
        type = types.info;
    }
    const placementList = [placements.topLeft, placements.topRight, placements.bottmoLeft, placements.bottomRight];
    if (!placementList.find(item => item === placements)) {
        placement = placements.bottomRight;
    }
    
    //打开通知框
    notification[type]({
        message,
        description: '',
        placement
    })
}

export const setJWTToken = token => localStorage.setItem('jwtToken', token);

export const getJWTToken = () => localStorage.getItem('jwtToken');

export const clearJWTToken = () => localStorage.removeItem('jwtToken');