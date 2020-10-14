import { notification } from 'antd';
import intl from 'react-intl-universal';
import constants from './constants';

export const getLabel = component => {
    return intl.get(component)?.label ?? {};
}

export const getMessage = component => {
    return intl.get(component)?.message ?? {};
}

export const replaceStr = (str, params) => {
    if (Array.isArray(params)) {
        params.map((item, index) => str = str.replace(`{${index}}`, item));
    }
    return str;
}

/**
 * 打开通知框
 * @param {*} param0 
 */
export const openNotification = ({ type, description, placement }) => {
    const types = constants.notifiction.type;
    const placements = constants.notifiction.placement;
    const typeList = [types.success, types.info, types.warning, types.warning];
    if (!typeList.find(item => item === type)) {
        type = types.info;
    }
    const placementList = [placements.topLeft, placements.topRight, placements.bottmoLeft, placements.bottomRight];
    if (!placementList.find(item => item === placements)) {
        placement = placements.bottomRight;
    }

    notification[type]({
        message: getLabel('Notification')[type],
        description,
        placement
    })
}