# 车牌指标摇号查询
项目使用 taro convert 从原生小程序转成 taro 项目，再搭配 React Hooks 改造成函数式组件。

数据由百度提供，样式参考腾讯出行小程序

## 运行
clone 项目之后先安装依赖 ```npm i```

以 h5 运行，使用以下命令
```bash
npm run dev:h5
```

以微信小程序运行，使用以下命令
```bash
npm run dev:weapp
```

## 过程
1. 先自行在 [taro 官网](https://taro-docs.jd.com/taro/docs/GETTING-STARTED) 根据快速开始的安装与使用的步骤安装脚手架工具
2. 打开本地已经写好的原生小程序的根目录，使用 ```taro convert```命令转换成 taro 项目
3. 转换成功后，移除项目中 ```@withWeapp()``` 和 ```Class``` 的部分，使用函数式组件进行改造


## 结语
此项目为本人第一次使用 taro 和 react 语法，项目内容简单，功能单一，如有 bug 和写得不优雅的地方，请各位大佬海涵

