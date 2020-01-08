# vue 源码学习与总结

## 学习目录

本项目所分析的`Vue.js`源码版本 v2.6.11 ，其代码目录如下：

```bash
├─dist                   # 项目构建后的文件
├─scripts                # 与项目构建相关的脚本和配置文件
├─flow                   # flow的类型声明文件
├─src                    # 项目源代码
│    ├─complier          # 与模板编译相关的代码
│    ├─core              # 通用的、与运行平台无关的运行时代码
│    │  ├─observe        # 实现变化侦测的代码
│    │  ├─vdom           # 实现virtual dom的代码
│    │  ├─instance       # Vue.js实例的构造函数和原型方法
│    │  ├─global-api     # 全局api的代码
│    │  └─components     # 内置组件的代码
│    ├─server            # 与服务端渲染相关的代码
│    ├─platforms         # 特定运行平台的代码，如weex
│    ├─sfc               # 单文件组件的解析代码
│    └─shared            # 项目公用的工具代码
└─test                   # 项目测试代码
```

主要学习 complier 与 core 文件夹。

## 学习路线

1. 响应式原理学习

2. 生命周期学习

3. 虚拟 DOM 与 diff 学习

4. 模板编译篇

5. 全局 API 篇

6. 内置组件篇

7. 其他
