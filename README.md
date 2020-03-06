# mallmanager88

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#文档格式化使用操作步骤
1、安装vetur,eslint,prettier
2、配置.eslintrc.js文件，
   在rules添加定义的规则，
   "semi": ["error", "never"],不适用分号结束
   "quotes": ["error", "single"]，使用单引号
   在extends添加， "@vue/prettier"
3、生成一个.prettierrc.js文件，添加
   module.exports = {
    singleQuote: true,使用单引号
    semi: false       不适用分号结束
    }
4、找到插件eslint，查看eslint的保存时的操作，
   "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
   复制粘贴到，文件-首选项-设置，
   输入搜索 eslint，可以在界面上设置，也可以点击右上角的 打开设置（json）以json的形式来设置
   直接粘贴到settings.json中的最后即可，保存
5、可以再打开vue文件，保存，可以看到，全部是设置的规则了。
