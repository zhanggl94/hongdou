const constants = {
    language: [
        { key: 'zh', value: '中文' },
        { key: 'en', value: 'EN' },
    ],
    notifiction: {
        type: { // notification type 
            success: 'success',
            info: 'info',
            error: 'error',
            warning: 'warning'
        },
        placement: {// notification position
            topLeft: 'topLeft',
            topRight: 'topRight',
            bottmoLeft: 'bottmoLeft',
            bottomRight: 'bottomRight'
        }
    },
    operation: {
        create: '0',
        read: '1',
        update: '2',
        delete: '3'
    },
    component_car: 'Car', // 汽车列表
    component_bill: 'Bill', // 账单列表
    dateFormat: 'YYYY/MM/DD' // 日期格式化
}
export default constants;