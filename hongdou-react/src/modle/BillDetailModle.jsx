export default class BillDetailModle {
    constructor(billDetail) {
        if (billDetail) {
            this.carInfo = billDetail.carInfo; // 汽车信息
            this.date = billDetail.date; // 日期
            this.billType = billDetail.billType; // 账单类型
            this.payType = billDetail.payType; // 支付种类
            this.actual = billDetail.actual; // 实际花费金额
            this.discount = billDetail.discount; // 优惠金额
            this.total = billDetail.total; // 总金额
            this.unitPrice = billDetail.unitPrice; // 单价
            this.place = billDetail.place; // 地点
            this.note = billDetail.note; // 备注
            this.userId = billDetail.userId; // 用户Id
        } else {
            this.carInfo = { id: '', name: '' }; // 汽车信息
            this.date = ''; // 日期
            this.billType = ''; // 账单类型
            this.payType = []; // 支付种类
            this.actual = 0; // 实际花费金额
            this.discount = 0; // 优惠金额
            this.total = 0; // 总金额
            this.unitPrice = 0; // 单价
            this.place = ''; // 地点
            this.note = ''; // 备注
            this.userId = ''; // 用户Id
        }
    }
}