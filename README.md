# Commander

[![NPM](https://img.shields.io/npm/v/@itharbors/commander)](https://www.npmjs.com/package/@itharbors/commander)
[![CI Status](https://github.com/itharbors/commander/actions/workflows/ci.yaml/badge.svg)](https://github.com/itharbors/commander/actions/workflows/ci.yaml)

参数解析小工具，用于解析传入的参数，并将参数转换成 js object 格式。

## 需求分析

### 功能需求

- 传入字符串数组，解析成 obj
- 定义可接受参数类型
- 根据传入定义，限制数据类型

### 非功能需求

- 暂无

## 整体结构

## 代码范例

基础用法

```typescript
import { Commander } from '@itharbors/commander';

const cmd = new Commander({
    bool: {
        value: false,
    },
    str: {
        value: '',
    },
});
cmd.parse(['str=1']);

cmd.get('str');  // 1
cmd.get('bool'); // false
```

## 关键决策

- 解析了没有定义的参数，当成字符串识别
    - 如果遇到无法识别的参数，保留参数方便调试

## 异常处理设计

- 无

## 性能优化

- 暂无

## 附件与参考文档

- 暂无
