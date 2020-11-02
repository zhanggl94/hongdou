export default class ResponResult {
    public isOk: boolean = true;
    public error: object = {};
    public message: string = '';
    public data: any;
    public jwtToken: string = '';
}