import XLSX from 'xlsx';

const defautlFileName = 'hongdou.xlsx';

/**
 * 导入Excle
 * @param {*} file 
 * @param {*} callback 
 */
export const importExcle = (file, callback) => {
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    fileReader.onload = event => {
        const result = { data: {}, error: null };
        try {
            const { result: excelData } = event.target;
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(excelData, { type: 'binary' });
            let data = []; // 存储获取到的数据
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break; // 如果只取第一张表，就取消注释这行
                }
            }
            result.data = data;
        } catch (e) {
            // 这里可以抛出文件类型错误不正确的相关提示
            result.error = e;
        }
        if (callback) {
            callback(result);
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(file);
}

/**
 * 导出Excle
 * @param {*} headers 
 * @param {*} data 
 * @param {*} fileName 
 */
export const exportExcel = (headers, data, fileName = defautlFileName) => {
    const _headers = headers
        .map((item, i) => Object.assign({}, { key: item.key, title: item.title, position: String.fromCharCode(65 + i) + 1 }))
        .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { key: next.key, v: next.title } }), {});

    const _data = data
        .map((item, i) => headers.map((key, j) => Object.assign({}, { content: item[key.key], position: String.fromCharCode(65 + j) + (i + 2) })))
        // 对刚才的结果进行降维处理（二维数组变成一维数组）
        .reduce((prev, next) => prev.concat(next))
        // 转换成 worksheet 需要的结构
        .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.content } }), {});

    // 合并 headers 和 data
    const output = Object.assign({}, _headers, _data);
    // 获取所有单元格的位置
    const outputPos = Object.keys(output);
    // 计算出范围 ,["A1",..., "H2"]
    const ref = `${outputPos[0]}:${outputPos[outputPos.length - 1]}`;

    // 构建 workbook 对象
    const wb = {
        SheetNames: ['mySheet'],
        Sheets: {
            mySheet: Object.assign(
                {},
                output,
                {
                    '!ref': ref,
                    '!cols': [{ wpx: 150 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 200 }, { wpx: 300 }],
                },
            ),
        },
    };

    // 导出 Excel
    XLSX.writeFile(wb, fileName);
}