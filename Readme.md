### hello-webpack

- 基于webpack的前端多页面工程
- 默认采用 ts

#### 已完成功能

- less 编译
- gzip 压缩
- eslint 检查
- stylelint 检查
- bundle-analyze boundle 构成分析
- ts typescript 语法支持

#### 使用方法
- dev
```js
yarn dev
```

- build
```js
yarn build
```

#### 创建新的页面

- 将 index.html index.ts 复制一份改名即可
- 如 index.html -> demo.html  index.ts -> demo.ts


##### 注意点
- **.ts 顶部的 require('file-loader!../index.html') 要和文件名保持一致
- 如 demo.ts 顶部则应该为 require('file-loader!../demo.html')
