const { equal, deepEqual } = require('node:assert');
const { describe, it, before } = require('node:test');

const {
    Commander,
} = require('../dist/commander');

describe('commander', () => {
    it('空参数 / 未初始化', async () => {
        const cmd = new Commander();
        equal(undefined, cmd.getParam('test'));
    });

    it('空参数 / 已初始化空对象', async () => {
        const cmd = new Commander();
        cmd.parse([]);
        equal(undefined, cmd.getParam('test'));
    });

    it('空参数 / 已初始化不存在的数据', async () => {
        const cmd = new Commander();
        cmd.parse(['test']);
        equal('', cmd.getParam('test'));
    });

    it('空参数 / 已初始化存在的数据', async () => {
        const cmd = new Commander({
            test: {
                value: false,
            },
        });
        cmd.parse(['test']);
        equal(true, cmd.getParam('test'));
    });

    it('传入 bool 数据', async () => {
        const cmd = new Commander({
            bool: {
                value: false,
            },
        });
        cmd.parse(['bool', 'str=123']);
        equal(true, cmd.getParam('bool'));
    });

    it('传入 str 数据', async () => {
        const cmd = new Commander({
            str: {
                value: '',
            },
        });
        cmd.parse(['bool', 'str=123']);
        equal('123', cmd.getParam('str'));
    });

    it('默认值', async () => {
        const cmd = new Commander({
            bool: {
                value: false,
            },
            str: {
                value: '',
            },
        });
        cmd.parse([]);
        equal(false, cmd.getParam('bool'));
        equal('', cmd.getParam('str'));
    });
});
