# mallmanager88

> A Vue.js project

## Build Setup

```bash
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

# 文档格式化使用操作步骤

# 1、安装 vetur,eslint,prettier

# 2、配置.eslintrc.js 文件，

在 rules 添加定义的规则，完整配置如下
"semi": ["error", "never"],不适用分号结束
"quotes": ["error", "single"]，使用单引号

.eslintrc.js 完整配置如下
module.exports = {
root: true,
env: {
node: true
},
'extends': [
'plugin:vue/essential',
'eslint:recommended'
],
parserOptions: {
parser: 'babel-eslint'
},
rules: {
'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//强制使用单引号
quotes: ['error', 'single'],
//强制不使用分号结尾
semi: ['error', 'never']
}
}

# 3、添加一个.prettierrc.js 或者 prettier.config.js 文件，添加

module.exports = {
singleQuote: true,使用单引号
semi: false 不适用分号结束
}
.prettierrc.js 完整配置如下
module.exports = {
// tab 缩进大小,默认为 2
tabWidth: 2,
// 使用 tab 缩进，默认 false
useTabs: false,
// 使用分号, 默认 true
semi: false,
// 使用单引号, 默认 false(在 jsx 中配置无效, 默认都是双引号)
singleQuote: true,
// 行尾逗号,默认 none,可选 none|es5|all
// es5 包括 es5 中的数组、对象
// all 包括函数对象等所有可选
TrailingCooma: 'none',
// 对象中的空格 默认 true
// true: { foo: bar }
// false: {foo: bar}
bracketSpacing: true,
// 箭头函数参数括号 默认 avoid 可选 avoid| always
// avoid 能省略括号的时候就省略 例如 x => x
// always 总是有括号
arrowParens: 'always',
}

# 4、找到插件 eslint，查看 eslint 的保存时的操作，

"editor.codeActionsOnSave": {
"source.fixAll.eslint": true
}
复制粘贴到，文件-首选项-设置，
输入搜索 eslint，可以在界面上设置，也可以点击右上角的 打开设置（json）以 json 的形式来设置
直接粘贴到 settings.json 中的最后即可，保存
settings.json 完整配置如下
{
//.vue 文件 template 格式化支持，并使用 js-beautify-html 插件
"vetur.format.defaultFormatter.html": "js-beautify-html",
//js-beautify-html 格式化配置，属性换行不强制、每行 120 字符
"vetur.format.defaultFormatterOptions": {
"js-beautify-html": {
"wrap_line_length": 120,
"wrap_attributes": "auto",
"end_with_newline": false
}
},
"vetur.format.defaultFormatter.js": "prettier",
//根据文件后缀名定义 vue 文件类型
"files.associations": {
"\*.vue": "vue"
},
//配置 ESLint 检查的文件类型
"eslint.validate": [
"javascript",
"javascriptreact"
],
//保存自动格式化
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
//保存时 eslint 自动修复错误
"source.fixAll.eslint": true
}
}

# 5、可以再打开 vue 文件，调整格式 保存，可以看到，全部是设置的规则了。
