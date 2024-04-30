const { equal, deepEqual } = require('node:assert');
const { describe, it, before } = require('node:test');

const {
    parseArguments,
    fillStringLength,
} = require('../dist/utils');

describe('utils', () => {
    describe('parseArguments', () => {
        it('[]', async () => {
            const result = parseArguments([]);
            deepEqual({}, result);
        });

        it('[test]', async () => {
            const result = parseArguments(['test']);
            deepEqual({ test: '' }, result);
        });

        it('[test=]', async () => {
            const result = parseArguments(['test=']);
            deepEqual({ test: '' }, result);
        });

        it('[test==]', async () => {
            const result = parseArguments(['test==']);
            deepEqual({ test: '=' }, result);
        });

        it('[test=1]', async () => {
            const result = parseArguments(['test=1']);
            deepEqual({ test: '1' }, result);
        });

        it('[-t=1]', async () => {
            const result = parseArguments(['-t=1']);
            deepEqual({ '-t': '1' }, result);
        });

        it('[1t=1]', async () => {
            const result = parseArguments(['1t=1']);
            deepEqual({ '1t': '1' }, result);
        });

        it('[=t]', async () => {
            const result = parseArguments(['=t']);
            deepEqual({ '=t': '' }, result);
        });

        it('[=t=]', async () => {
            const result = parseArguments(['=t=']);
            deepEqual({ '=t': '' }, result);
        });

        it('[=t=1]', async () => {
            const result = parseArguments(['=t=1']);
            deepEqual({ '=t': '1' }, result);
        });
    });

    describe('fillStringLength', () => {
        it('a, 5, \' \'', () => {
            const str = fillStringLength('a', 5, ' ');
            equal('a    ', str);
        });

        it('填充非字符串数据', async () => {
            let err = false;
            try {
                fillStringLength('', 5, 1);
            } catch (error) {
                err = true;
            }
            equal(true, err);
        });

        it('填充空非字符串', async () => {
            let err = false;
            try {
                fillStringLength('', 5, '');
            } catch (error) {
                err = true;
            }
            equal(true, err);
        });
    });
});
