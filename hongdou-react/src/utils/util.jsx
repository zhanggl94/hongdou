import { notification } from 'antd';
import constants from './constants';

/**
 * 打开通知框
 * @param {*} param0 
 */
export const openNotification = ({ type, message, placement }) => {
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

/**
 * 设置Token
 * @param {*} token 
 */
export const setJWTToken = token => localStorage.setItem('jwtToken', token);

/**
 * 获取Token
 */
export const getJWTToken = () => localStorage.getItem('jwtToken');

/**
 * 清除Token
 */
export const clearJWTToken = () => localStorage.removeItem('jwtToken');

/**
 * 格式化日期(Excle导入的日期变成数字，需要格式化)
 * @param {*} numb 
 * @param {*} format 
 */
export const formatExcelDate = (numb, format = "/") => {
    const time = new Date((numb - 1) * 24 * 3600000 + 1)
    time.setYear(time.getFullYear() - 70)
    const year = time.getFullYear() + ''
    const month = time.getMonth() + 1 + ''
    const date = time.getDate() + ''
    if (format && format.length === 1) {
        return year + format + month + format + date
    }
    return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
}

/**
 * 根据Value获取Map的key
 * @param {*} map 
 * @param {*} value 
 * @param {*} compare 
 */
export const findMapKey = (map, value, compare = (a, b) => a === b) => {
    let key = '';
    map.forEach((v, k) => {
        if (compare(map.get(k), value)) {
            key = k;
            return;
        }
    });
    return key;
}