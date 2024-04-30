import { fillStringLength, parseArguments } from './utils';

interface CommandDefine {
    // 默认值
    value: boolean | string;

    // 短命令
    short?: string;
    // 是否必须传入，默认 false
    required?: boolean;
    // 参数说明
    detail?: string;
}

export class Commander<M extends Record<string, CommandDefine>, K extends keyof M> {

    private _commands: M;
    private _values: Partial<Record<K, M[K]['value']>> = {};

    constructor(commands: M) {
        this._commands = commands || {};
    }

    private _generateCommandDetail(length: number, key: string, cmd: CommandDefine) {
        length += 4;
        let detail = `\n  ${key}`;
        if (cmd.short) {
            detail += `, ${cmd.short}`;
        }
        detail = fillStringLength(detail, length, ' ');
        switch (typeof cmd.value) {
            case 'boolean':
                detail += ` <boolean>`;
                break;
            case 'string':
                detail += ` <string> `;
                break;
            default:
                detail += ` <unknown>`;
        }
        detail += `  ${cmd.detail}`;
        return detail;
    }

    /**
     * 获取传入所有参数的相信信息
     * 一般用于输出 help 信息
     * @returns 
     */
    public getDetailInfo() {
        let keyMaxLength = 0;
        for (let key in this._commands) {
            const cmd = this._commands[key];
            let length = key.length;
            if (cmd.short) {
                length += cmd.short.length + 2;
            }
            keyMaxLength = Math.max(keyMaxLength, length);
        }

        let detail = `Usage:`;
        detail += `\nRequired:`;
        for (let key in this._commands) {
            const cmd = this._commands[key];
            if (!cmd.required) {
                continue;
            }

            detail += this._generateCommandDetail(keyMaxLength, key, cmd);
        }
        detail += `\nOptional:`;
        for (let key in this._commands) {
            const cmd = this._commands[key];
            if (cmd.required) {
                continue;
            }

            detail += this._generateCommandDetail(keyMaxLength, key, cmd);
        }
        return detail;
    }

    /**
     * 获取一个参数
     * @param key 
     * @returns 
     */
    public getParam(key: K): M[K]['value'] | undefined {
        if (key in this._values) {
            return this._values[key];
        } else if (this._commands[key]) {
            return this._commands[key].value;
        }
        return undefined;
    }

    /**
     * 遍历命令行参数并将其映射到命令对象的属性值上
     * @param args - 命令行参数数组
     */
    public parse(args: string[]) {
        const param = parseArguments(args);
        for (const key in param) {
            let value: string | boolean = param[key];

            // 检查命令对象中是否存在该键
            if (key in this._commands) {
                const defType = typeof this._commands[key].value;

                // 如果默认值类型为布尔值，则将值强制转换为 true
                if (defType === 'boolean') {
                    value = true;
                }
            }

            // 将键值对添加到命令对象的 _values 属性中
            this._values[key as K] = value;
        }
    }
}
