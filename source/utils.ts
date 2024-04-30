/**
 * 解析参数字符串，转换成一个参数对象
 * @param args
 */
export function parseArguments(args: string[]) {
    const result: { [key: string]: string } = {};
    for (const arg of args) {
        // 匹配参数格式 [name]=value
        const regResult = arg.match(/^(=?[^=]+)=(\S+)?/);
        if (regResult) {
            result[regResult[1] || ''] = regResult[2] || '';
        } else {
            // 如果没有等号，则将参数视为值为 undefined 的键
            result[arg] = '';
        }
    }
    return result;
}

/**
 * 补全字符串长度
 * @param str
 * @param length
 * @param fillChar
 */
export function fillStringLength(str: string, length: number, fillChar: string = ' ') {
    if (typeof fillChar !== 'string') {
        throw new Error('fillChar must be a string');
    }
    if (fillChar.length === 0) {
        throw new Error('fillChar must not be empty');
    }
    let temp = str;
    while (temp.length < length) {
        temp += fillChar;
    }
    return temp;
}
