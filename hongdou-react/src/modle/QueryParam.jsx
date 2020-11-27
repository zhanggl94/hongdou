export default class QueryParam {
    constructor(paramList) {
        if (Array.isArray(paramList) && paramList.length) {
            return paramList.map(item => {
                item = item || { key: '1', operaiont: '=', value: '1' }
                item.key = item.key;
                item.operation = item.operation || '=';
                item.value = item.value;
                return item;
            });
        }
        return [];
    }
}