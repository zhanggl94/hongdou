export default class QueryParam {
    constructor(param) {
        param = param || { key: '1', operaiont: '=', value: '1' }
        this.key = param.key;
        this.operation = param.operation || '=';
        this.value = param.value;
    }
}