# REACT

## 介绍

一款javascript前端框架，把用户界面抽象成一个个的组件，按需组合成页面，[官网](https://zh-hans.reactjs.org/)，与其他框架的共同点是，都采用虚拟dom，和数据驱动

|          | angularJs | reactJs | vueJs | angularTs |
| -------- | --------- | ------- | ----- | --------- |
| 控制器   | √         | -       | -     | 弱化      |
| 过滤器   | √         | -       | √     | √         |
| 指令     | √         | -       | √     | √         |
| 模板语法 | √         | -       | √     | √         |
| 服务     | √         | -       | -     | √         |
| 组件     | -         | √       | √     | √         |
| jsx      | -         | √       | 加入  | -         |



## 环境搭建

### 官方脚手架

安装 [yarn](https://classic.yarnpkg.com/zh-Hans/docs/install)

```js
//查询当前镜像
yarn config get registry 
//设置为淘宝镜像
yarn config set registry https://registry.npm.taobao.org/
//设置为官方镜像
//yarn config set registry https://registry.yarnpkg.com
```

**安装** [create-react-app](https://create-react-app.dev/docs/getting-started)

```js
yarn global add create-react-app 
或
npm install create-react-app	-g //非安装包安装的yarn 推荐
```

**创建** react项目

```js
create-react-app 目录 | npx create-react-app 目录 | npm init react-app 目录
yarn eject   解构出所有的配置文件 可选
yarn start |  npm start 			开发
yarn build |  npm run build	 打包

//调试 需要安装给chrome浏览器一个插件 react-dev-tools
```

**环境解析**

- react: 核心包，解析组件,识别jsx **演示**
- react-dom: 编译 -> 浏览器 **演示**
- react-scrpts: react的项目环境配置
- manifest.json 生成一个网页的桌面快捷方式时，会以这个文件中的内容作为图标和文字的显示内容
- registerServiceWorker.js支持离线访问，所以用起来和原生app的体验很接近,只有打包生成线上版本的react项目时，registerServiceWorker.js才会有效。服务器必须采用https协议
- 对Internet Explorer 9,10和11的支持需要polyfill。

**环境配置**

```js
npm run eject | yarn eject
报git错误时: 
	git add . -> git commit -m 'init' -> yarn eject

  报缺少babel 包: 安装一下
  
//修改端口
//修改script=>start.js
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3001;

//去除eslint 警告
//config/webpack.config.js
//注释关于eslint的导入和rules规则
```

### 第三方脚手架

yomen/dva/umi

### webpack手动搭建



## **资源限制**

- 本地资源导入(import) 不可以导入src之外的包

- 相对 指向src，绝对路径 指向了 public目录

- 前景图片, 相对 和 绝对路径 都指向了 public目录



## JSX

jsx是一个 JavaScript 的语法扩展，可以理解为js的一个新的数据类型，类XML（JSON前身）语法，出现在js当中，文件为xx.js|xx.jsx

```jsx
var b= <strong>强壮</strong>
```

**语法要求**

- 标签要闭合
- 元素必须要有一个顶层元素
- 变量首字母大写代表组件，小写对应是js数据类型
- 属性，小驼峰命名  `<xx tabIndex="2">`

JSX 是一个 JavaScript 语法扩展。它类似于模板语言，但它具有 JavaScript 的全部能力。JSX 最终会被编译为 `React.createElement()` 函数调用，返回称为 “React 元素” 的普通 JavaScript 对象

## 类

es6

```js
class Person2223{
  constructor(name){
    this.name=name||'alex'  //实例属性创建，赋值
  }
  show(){//实例方法
    console.log('show',this.name);
  }
}
Person2223.VERSION='1.2.3';//静态属性|类属性

//子类
class Worker123 extends Person2223{
  constructor(name,job){
    super(name);//类如果有继承 super就要出现
    this.job=job||'卖烧饼';
  }
  show2(){
    console.log(this.job,this.name);
  }
}
```

es6+

```js
//es7 类
class Person123{
  name='alex'; //实例属性  放在类内部,设置默认值
  age; //没有默认值的实例属性
  static VER='1.11.1';  //类属性 静态属性
  constructor(name,age){
    this.name=name;
    this.age=age||20; //构造器里面可以初始化实例属性
  }

  show(){//方法
    console.log(this.name,this.age,this.show);//访问实例属性
  }

  static show2(){//静态|类 方法定义
    console.log(this.name)
  }
}

class Workerr321 extends Person123{

  job; //实例属性

  static SUM=100;

  constructor(name,age,job){
    super(name,age);//调用父类 影响父类传入到当前的实例属性
    this.job=job||'卖闲鱼'; //构造器初始化
    // this.address='外滩18号';//实例属性，要实现声明
  }

  showJob(){
    console.log(this.job);
  }

}
```



## 组件

react组件：`类`组件和`函数式`组件和`api`组件(createClass)

**创建组件**

```jsx
//es6
import React from 'react';

class 组件名 extends React.Component{

  state={} 实例属性 组件状态

  static msg;  类属性

  constrctor(props){ //需要在构造时，修改组件的状态时，constrctor才会出现
    super(props) //类如果有继承 super就要出现
      需要在组件构造器内处理传递过来的props时，props参数就出现

    this.state={ // 本地状态

    }
  }
  render(){
    return jsx|null   //jsx~~要渲染   null不渲染
  }
  方法1(){} 自定义的方法
  static 方法2(){}
}

//es5
var React = require('react');
let 组件名 = React.createClass({
  getInitialState:function(){  //组件状态
    return {
      数据:值
    }
  }
  render:function(){
    return jsx
  }
});
```

**使用组件**

```jsx
<HelloWorld/>
<HelloWorld></HelloWorld>

嵌套组件
```

**渲染**（描画）页面

```js
import ReactDom from 'react-dom';
var RactDom = require('react-dom');
ReactDom.render(jsx,插入点,回调)
```



## props

**传递属性**

```jsx
<组件名 属性名=值 属性名2=值2 .. />
```

> propName="字符"  propName={js数据类型}

**使用属性**

```jsx
{this.props.属性名}
```

> this 代表的是组件本身
>
> 对象无法直接通过{对象}展示

**类型检查**

```jsx
import propsTypes from 'prop-types'   需要下载

//默认值:		
组件.defaultProps={propName:值,xx:oo}

//类型约定:
组件.propTypes={propsName:propsTypes库.类型名,xx:类型}
//propsTypes.array/bool/func/number/object/string

//必传参数
propName: propsTypes库.类型名.isRequired
```

> 组件无论是使用[函数声明还是通过 class 声明](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)，都决不能修改自身的 props



## 事件

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
- 类组件，事件函数内部this会丢失

事件绑定

```jsx
<JSX元素 onClick={this.实例方法|函数体}
```

修正this

```jsx
onClick={this.方法.bind(this,值)}
onClick={()=>this.方法()}
构造器： this.方法=this.方法.bind(this)  √
this.方法=()=>{箭头函数定义方法}  √√
```

事件对象

```js
实例方法(ev)	ev 代理事件对象 ev.target 返回虚拟Vdom √
```



## 组件状态

state|数据|私有状态|本地状态

**定义**

```jsx
//es6+ 
//实例属性: state    
class App{state:value}

//es6：构造器 this.state  
class App {
  constructor(){
    this.state={}
  }
}

//ES5：
React.createClass({
  getInitialState:function(){
    return {
      状态名:值,xx:oo
    }
  }   
})
```

**获取**

```jsx
//渲染
{this.state.proname}
//获取
this.state.proname
```

**修改状态**

```jsx
//修改
this.setState(对象)  //浅合并state

this.setState((prevState,prevProps)=>{
  //一般是用于在setState之前做一些操作,this.state==prevState==修改之前的state
  return {
    sname:value
  }
}) 

this.setState({
  sname:value
}, () => {
  //一般是用于在setState之后做一些操作
  //this.state == 修改之后的state
})
```

> setState是异步的

## 列表渲染   （循环渲染）

```jsx
this.props|state.属性名.map(function(val,index){
  return html
})
```



## 条件渲染

```jsx
//表达式渲染
this.state|props.proname ? jsx1 : jsx2
this.state|props.proname && jsx

//render里面写语句
render(){
  let el=null;
  if(this.state|props.proname){
    el=jsx1
  }else{
    el=jsx2
  }
  
  return el
}

//渲染写成实例方法
renderFn(){
  ...
  return el
}
render(){
  return {this.renderFn()}
}
```



## refs

需要抓取dom元素与第三方 DOM 库集成，触发命令式动画，管理焦点，文本选择或媒体播放

**用法**

```jsx
//string refs
<jsx元素 ref="名字"...
this.refs.名字

// 实例化
this.firstRef = React.createRef() //发生在构造器
<jsx ref={this.firstRef} />
  
this.firstRef 访问 -》 {current:dom}
  
// callback refs  回调
<jsx ref={el => this.定义一个实例属性 = el}
this.定义一个实例属性 //后期用作访问jsx元素
  
//当组件挂载时，将 DOM el元素传递给 ref 的回调
//当组件卸载时，则会传递 null。
//ref 回调会在 componentDidMount 和 componentDidUpdate 生命周期之前调用
```

## 受控元素

表单的value受控，受数据控制，

```jsx
value={this.state.数据名}  //model->view
onChange={this.方法}   //view->model
```

**处理多个输入元素**

可以为每个元素添加一个 name 属性(通常和数据名一致)，处理函数根据 event.target.name 的值来选择要做什么

```jsx
<input name="inputUserName" 
<input name="inputContent"

this.setState({[ev.target.name]:ev.target.value})
```

`双向绑定`

## 非受控元素

要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 [使用 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 来从 DOM 节点中获取表单数据

```jsx
<input type="text" ref="xx" />
```

**默认值**

表单元素上的 `value` 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新,指定一个 `defaultValue` 属性，而不是 `value`

`留言板`

## 样式

### css

**引用**

```jsx
<jsx className="类名 类名2" className={返回字符}
<jsx style={{key:value,key:value}}
//style的属性值，可以不给单位，默认px  子属性小驼峰
```

**定义**

- index.html ： 引入  link/style  公共样式  不优化 第三方样式

- index.jsx： import './css/xx.css'  是全局 公共样式 会优化

- 组件.jsx  import './css/xx.css'  全局  公共样式 会优化

**选择器冲突**解决方案

- 命名空间  BEM

- 模块化

```jsx
import 变量  from './css/xx.module.css' 
<jsx className={变量.类名|id}

//配置1 
//webpack配置 "style-loader!css-loader?modules" | module:true
//问题：所有css都需要模块化使用

//配置2 
//改名xx.css -> xx.module.css 
//需要模块化的才修改,不影响其他非模块化css写法
```

### **scss**

安装: node-sass

```scss
/*定义scss*/
$bg-color: #399;
.box{
  background: $bg-color;
}
```

```jsx
//引入
import 'xx/xx.scss'

//使用
<jsx className="box"

//模块化
import style form xx.module.scss
<xx className={style.box}
```

引入scss**全局变量**

- 局部scss文件内部： @import './全局.scss'

- webpack配置一次，局部scss内部直接使用

```js
//1. 安装插件 : sass-resources-loader
//2. 配置修改webpack.config.js

{
  test:sassRegex,
  ...
  use: [
    {loader:'style-loader'},
    {loader:'css-loader'}, 
    {loader:'sass-loader'},
    {
      loader: 'sass-resources-loader',
      options:{
        resources:'./src/xx/全局主题.scss'
      }
    }
  ]
}

```

> 注意: 
> 		loader:'css-loader?modules'    ?modules 模块化时需要添加
> 		resources 指向作用域在项目环境下



## 组件拆分规则

组件拆分目标：为了复用

组件如何拆：单一原则

状态应该给谁（状态提升）

- 尽量给顶层组件(状态提升),->props->子组件

- 可以从 props(属性) 得到，那么它可能不应该在 state(状态) 中

- 方法-》操作数据(数据|状态在哪，方法就应该在哪)
- props取名从组件本身的角度来命名, 而不是它被使用的上下文环境





## 动画

**tansition**

```css
transition: .5s ease all;
进度条
```

**AntMotion**

[官网](https://motion.ant.design/index-cn)，是一款蚂蚁金服的动画组件库，支持单元素，css、进出场动画、及文字动画

组件内部的 一级元素&& 做动画
一级元素要有key，根据编号依次做动画,无key不动画，路由离场动画无效
包裹路由组件无效(一级元素&& 进退场)





## 生命周期

实例化 ->  更新期  -> 销毁时

### es5版

**实例化**

1. 取得默认属性(**getDefaultProps**) 外部传入的props
2. 初始状态(**getInitailState**)  state状态
3. 即将挂载 **componentWillMount**
4. 描画VDOM  **render**
5. 挂载完毕 **componentDidMount**

### 次新版

**实例化**

1. 取得默认属性，初始状态在constructor中完成

   运行一次，可读数据，同步修改state，可以访问到props

2. 即将挂载 **componentWillMount**

3. 描画VDOM  **render**

4. 挂载完毕 **componentDidMount**

   使用ref，使用setState，读取数据

**更新期**

1. props改变 **componentWillReceiveProps**(nextProps)
   初始化render时不执行 这里调用更新状态是安全的，并不会触发额外的render调用，nextProps 更新后  this.props更新前

2. 是否更新 **shouldComponentUpdate**  

   指视图 return true/false

3. 即将更新 **componentWillUpdate**

4. 描画dom  **render**

   不要在这里修改数据

5. 描画结束 componentDidUpdate

**销毁时**

**componentWillUnmount**即将卸载，可以做一些组件相关的清理工作，例如取消计时器、网络请求等

> 父更新子更新，子更新父不更新

### 新版

[脑图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)，挂载前、更新前、props更新前统一用getDerivedStateFromProps代替，并添加了返回快照钩子getSnapshotBeforeUpdate

> 返回快照：发生在render完了，但还没有去编译真实dom之前，返回dom的快照

**实例化**

1. 渲染前 static **getDerivedStateFromProps**(nextProps,nextState)  {} 

   > 无法访问this
   > nextProps,nextState是更新后的
   > 必须返回 一个对象，用来更新state 或者 返回 null不更新
   > 必须要初始化state
   > state 的值在任何时候都取决于 props时

2. 渲染中 **render**

   > 必须return jsx|string|number|null
   > 不会直接与浏览器交互:不要操作DOM|和数据

3. 挂载后 **componentDidMount**

**更新期**

1. 渲染前 static **getDerivedStateFromProps**(nextProps, nextState)

2. 是否渲染 **shouldComponentUpdate**(nextProps, nextState)

   > 是否更新，必须返回true/false
   > 首次渲染或使用 forceUpdate() 时不会调用该方法
   > nextProps,nextState更新后的,this.props,this.state 更新前的
   > return false 只阻止当前组件渲染

3. 渲染中 **render**

4. dom快照 **getSnapshotBeforeUpdate**(prevProps, prevState)

   > 组件能在发生更改之前从 DOM 中捕获一些信息（dom渲染前的状态)
   > 返回的 值|null 会给 componentDidUpdate
   > prevProps, prevState 更新前 this.props,this.state更新后
   >
   > [事例](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

5. 更新后 **componentDidUpdate**(prevProps, prevState,snopshot)

   > this.props.更新后的
   > snopshot 是 getSnapshotBeforeUpdate构造的返回值
   >
   > 抓取到的是渲染后的dom状态，通过snopshot拿到dom渲染前的状态

**销毁时**

即将卸载 **componentWillUnmount**



## 数据交互

### fetch

原生api，是promise的语法糖，用法如下

```jsx
fetch(url+get数据,{配置}).then((res)=>{}).catch((err)=>{})

//配置
//method:'POST'  默认get
//headers:{"Content-type":"application/x-www-form-urlencoded"},
//body:'a=1&b=2'|URLSearchPrams
//注意： body数据为字符时，需要携带请求头
//async + await 用法
```

> res.ok :	true/false 成功/失败
> 		res.status:	 状态码
> 		res.body :	数据 数据流(stream)
> 		res.text() ：	转换 文本(string)，过程异步，return res.text()
> 		res.json() ：	转  对象

**jsonp**

fetch不带jsonp请求  需要依赖第三库`yarn add  fetch-jsonp --save`

```js
import fetchJsonp from 'fetch-jsonp'

fetchJsonp(url+数据,{配置}).then((res)=>{}).catch(err=>{})

//是个promise 返回promise 数据是个流
//res.json()  -> 流转换数据 是异步
```

> timeout: 延时  5000	配置
> 		jsonpCallback: 回调函数key callback
> 		jsonpCallbackFunction: null
>
> **百度下拉**（函数节流、事件、setState异步）

### axios

同vue

### 客户端代理

正向代理隐藏真实客户端，反向代理隐藏真实服务端，正向代理实现翻墙，反向代理实现跨域，客户端代理指的就是代码写在客户端，不过实现的是跨域

方案1

```js
//配置: package.json
"proxy":"https://uncle9.top"

//组件
/api/xx ...

问题： 只能代理一个服务器
```

方案2

利用客户端代理中间件(http-proxy-middleware)完成, 官网给了新的使用方式，在src下新建文件setupProxy.js加下面代码，无需单独应用，webpack会自动引入文件。

```js
// src/ 创建 setupProxy.js

//verion < 1.0
const proxy = require('http-proxy-middleware'); //需要安装中间件  
module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: 'https://uncle9.top',
      changeOrigin: true
    })
  );
  app.use(
    proxy("/v2", {
      target: "https://api.douban.com",
      changeOrigin: true
    })
  );
};

//组件： /api/xx ... | /v2/...

//verion > 1.0
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  }));

  app.use('/api2', createProxyMiddleware({
    target: 'http://vareyoung.top',
    changeOrigin: true,
    pathRewrite: { //路径替换
      '^/api2': '/api', // axios 访问/api2 == target + /api
    }
  }));

};
```

方案3

配置create-react-app环境下的webpack

```.
// config/webpackDevServer.js

proxy: {
  '/api2': {
    target: 'http://vareyoung.top', // 后台服务地址以及端口号
    ws: true, // websoket 服务
    changeOrigin: true, //是否跨域
    pathRewrite: { '^/api2': '/api' }
  }
}
```



## mock

JSON-Server 是一个 Node 模块，运行 Express 服务器，你可以指定一个 json 文件作为 api 的数据源。

### 安装json-server

```sh
npm install -g json-server
```

### 启动 json-server

`json-server`可以直接把一个`json`文件托管成一个具备全`RESTful`风格的`API`,并支持跨域、`jsonp`、路由订制、数据快照保存等功能的 web 服务器。

db.json文件的内容：

```json
{
  "course": [
    {
      "id": 1000,
      "course_name": "马连白米且",
      "autor": "袁明",
      "college": "金并即总变史",
      "category_Id": 2
    },
    {
      "id": 1001,
      "course_name": "公拉农题队始果动",
      "autor": "高丽",
      "college": "先了队叫及便",
      "category_Id": 2
    }
  }
}
```

例如以下命令，把`db.json`文件托管成一个 web 服务。

```sh
$ json-server --watch --port 53000 db.json
```

输出类似以下内容，说明启动成功。

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:53000/course

Home
http://localhost:53000

Type s + enter at any time to create a snapshot of the database
Watching...
```

此时，你可以打开你的浏览器，然后输入：<http://localhost:53000/course>

### json-server 的相关启动参数

- 语法：`json-server [options] <source>`
- 选项列表：

| 参数               | 简写 | 默认值                                              | 说明                             |
| :----------------- | :--- | :-------------------------------------------------- | :------------------------------- |
| --config           | -c   | 指定配置文件                                        | [默认值: "json-server.json"]     |
| --port             | -p   | 设置端口 [默认值: 3000]                             | Number                           |
| --host             | -H   | 设置域 [默认值: "0.0.0.0"]                          | String                           |
| --watch            | -w   | Watch file(s)                                       | 是否监听                         |
| --routes           | -r   | 指定自定义路由                                      |                                  |
| --middlewares      | -m   | 指定中间件 files                                    | [数组]                           |
| --static           | -s   | Set static files directory                          | 静态目录,类比：express的静态目录 |
| --readonly         | --ro | Allow only GET requests [布尔]                      |                                  |
| --nocors           | --nc | Disable Cross-Origin Resource Sharing [布尔]        |                                  |
| --no               | gzip | , --ng Disable GZIP Content-Encoding [布尔]         |                                  |
| --snapshots        | -S   | Set snapshots directory [默认值: "."]               |                                  |
| --delay            | -d   | Add delay to responses (ms)                         |                                  |
| --id               | -i   | Set database id property (e.g. _id) [默认值: "id"]  |                                  |
| --foreignKeySuffix | --   | fks Set foreign key suffix (e.g. _id as in post_id) | [默认值: "Id"]                   |
| --help             | -h   | 显示帮助信息                                        | [布尔]                           |
| --version          | -v   | 显示版本号                                          | [布尔]                           |

- source可以是json文件或者js文件。实例：

```sh
json-server --watch -c ./jsonserver.json
json-server --watch db.js  命令行里面要的db是个函数
json-server db.json
json-server --watch -port 8888 db.json
```

### 动态生成模拟数据

启动json-server的命令：`json-server --watch db.js` 是把一个js文件返回的数据托管成web服务。

app.js配合[mockjs](http://mockjs.com/)库可以很方便的进行生成模拟数据。

```js
// 用mockjs模拟生成数据
var Mock = require('mockjs');

module.exports = () => {
  // 使用 Mock
  var data = Mock.mock({
    'course|227': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1000,
        course_name: '@ctitle(5,10)',
        autor: '@cname',
        college: '@ctitle(6)',
        'category_Id|1-6': 1
      }
    ],
    'course_category|6': [
      {
        "id|+1": 1,
        "pid": -1,
        cName: '@ctitle(4)'
      }
    ]
  });
  // 返回的data会作为json-server的数据
  return data;
};
```

### 路由

#### 默认的路由

`json-server`为提供了`GET`,`POST`, `PUT`, `PATCH` ,`DELETE`等请求的API,分别对应数据中的所有类型的实体。

```
# 获取所有的课程信息
GET    /course

# 获取id=1001的课程信息
GET    /course/1001

# 添加课程信息，请求body中必须包含course的属性数据，json-server自动保存。
POST   /course

# 修改课程，请求body中必须包含course的属性数据
PUT    /course/1
PATCH  /course/1

# 删除课程信息
DELETE /course/1

# 获取具体课程信息id=1001
GET    /course/1001
```

#### 自定义路由

当然你可以自定义路由：

```sh
$ json-server --watch --routes route.json db.json
```

`route.json`文件

```json
{
  "/api/*": "/$1",    //   /api/course   <==>  /course
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

### 自定义配置文件

通过命令行配置路由、数据文件、监控等会让命令变的很长，而且容易敲错，可以把命令写到npm的scripts中，但是依然配置不方便。

json-server允许我们把所有的配置放到一个配置文件中，这个配置文件默认`json-server.json`;

例如:

```json
{
  "port": 53000,
  "watch": true,
  "static": "./public",
  "read-only": false,
  "no-cors": false,
  "no-gzip": false,
  "routes": "route.json"
}
```

使用配置文件启动json-server:

```sh
# 默认使用：json-server.json配置文件
$ json-server db.js  
$ json-server db.json 

# 指定配置文件
$ json-server --watch -c jserver.json db.json
```

### 过滤查询

查询数据，可以额外提供

```
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2

# 可以用 . 访问更深层的属性。
GET /comments?author.name=typicode
```

还可以使用一些判断条件作为过滤查询的辅助。

```http
GET /posts?views_gte=10&views_lte=20
```

可以用的拼接条件为：

- `_gte` : 大于等于
- `_lte` : 小于等于
- `_ne` : 不等于
- `_like` : 包含

```http
GET /posts?id_ne=1
GET /posts?id_lte=100
GET /posts?title_like=server
```

### 分页查询

默认后台处理分页参数为： `_page` 第几页， `_limit`一页多少条。

```
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```

> 默认一页10条。

后台会返回总条数，总条数的数据在响应头:`X-Total-Count`中。

### 排序

- 参数： `_sort`设定排序的字段
- 参数： `_order`设定排序的方式（默认升序）

```http
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
```

支持多个字段排序：

```http
GET /posts?_sort=user,views&_order=desc,asc
```

### 任意切片数据

```http
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
```

### 全文检索

可以通过`q`参数进行全文检索，例如：`GET /posts?q=internet`

### 实体关联

#### 关联子实体

包含children的对象, 添加`_embed`

```http
GET /posts?_embed=comments
GET /posts/1?_embed=comments
```

#### 关联父实体

包含 parent 的对象, 添加`_expand`

```http
GET /comments?_expand=post
GET /comments/1?_expand=post
```

### 其他高级用法

`json-server`本身就是依赖express开发而来，可以进行深度定制。细节就不展开，具体详情请参考[官网](https://github.com/typicode/json-server)。

```js
const jsonServer = require('json-server');//在node里面使用json-server包
const db = require('./db.js');//引入mockjs配置模块
const path = require('path');
const Mock = require('mockjs');
let mock='/mock';//定义路由根别名

//创建服务器
const server = jsonServer.create();//创建jsonserver 服务对象


//配置jsonserver服务器 中间件
server.use(jsonServer.defaults({
  static:path.join(__dirname, '/public'),//静态资源托管
}));
server.use(jsonServer.bodyParser);//抓取body数据使用json-server中间件


//响应
server.use((request, res, next) => {//可选 统一修改请求方式
  // console.log(1)
  // request.method = 'GET';
  next();
});

//登录注册校验
let mr = Mock.Random;//提取mock的随机对象
server.get(mock+'/login', (req, res) => {
  // console.log(req.query, req.body);//抓取提交过来的query和body
  let username=req.query.username;
  let password=req.query.password;
  (username === 'aa' && password === 'aa123')?
    res.jsonp({
      "err": 0,
      "msg": "登录成功",
      "data": {
        "follow": mr.integer(1,5),
        "fans": mr.integer(1,5),
        "nikename": mr.cname(),
        "icon": mr.image('20x20',mr.color(),mr.cword(1)),
        "time": mr.integer(13,13)
      }
    }) :
    res.jsonp({
      "err": 1,
      "msg": "登录失败",
    })

});
server.post(mock+'/reg', (req, res) => {
  let username=req.body.username;
  (username !== 'aa') ?
    res.jsonp({
      "err": 0,
      "msg": "注册成功",
      "data": {
        "follow": mr.integer(0,0),
        "fans": mr.integer(0,0),
        "nikename": mr.cname(),
        "icon": mr.image('20x20',mr.color(),mr.cword(1)),
        "time": mr.integer(13,13)
      }
    }) :
    res.jsonp({
      "err": 1,
      "msg": "注册失败",
    })

});

//响应mock接口 自定义返回结构 定义mock接口别名
const router = jsonServer.router(db);//创建路由对象 db为mock接口路由配置  db==object

router.render = (req, res) => {//自定义返回结构
  let len = Object.keys(res.locals.data).length; //判断数据是不是空数组和空对象
  // console.log(len);

  setTimeout(()=>{//模拟服务器延时
    res.jsonp({
      err: len !== 0 ? 0 : 1,
      msg: len !== 0 ? '成功' : '失败',
      data: res.locals.data
    })
  },1000)

  // res.jsonp(res.locals.data)

};

server.use(jsonServer.rewriter({//路由自定义别名
  [mock+"/*"]: "/$1",

  // "/product\\?dataName=:dataName": "/:dataName",
  // "/banner\\?dataName=:dataName": "/:dataName",
  // "/detail\\?dataName=:dataName&id=:id": "/:dataName/:id",

  // "/product/del\\?dataName=:dataName&id=:id": "/:dataName/:id",
  // "/product/add\\?dataName=:dataName": "/:dataName",
  // "/product/check\\?dataName=:dataName&id=:id": "/:dataName/:id"
}));

server.use(router);//路由响应



//开启jsonserver服务
server.listen(3333, () => {
  console.log('mock server is running')
});
```



## 路由

[官网](https://reacttraining.com/react-router/) 中文

|          | vue-router                   | react-router                 |
| -------- | ---------------------------- | ---------------------------- |
| **配置** | 分离式（统一位置配置）       | 嵌套式（路由配置在组件内部） |
| **匹配** | 排他性（只有一个路由被渲染） | 包容性（多路由渲染）         |
| **形态** | 静态路由                     | 动态路由                     |

**理念**

遵循Just Component的 API 设计理念 万物皆组件，路由规则位于布局和 UI 本身之间

**安装**

React Router被拆分成三个包：react-router,react-router-dom和react-router-native。react-router提供核心的路由组件与函数。其余两个则提供运行环境（即浏览器与react-native）所需的特定组件

```node
yarn add react-router-dom --save
```

**提供组件**

| 组件          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| BrowserRouter | 约定模式 为 history，使用 HTML5 提供的 history API 来保持 UI 和 URL 的同步 |
| HashRouter    | 约定模式 为 hash，使用 URL 的 hash (例如：window.location.hash) 来保持 UI 和URL 的同步 |
| NavLink       | 声明式跳转 还可以约定 路由激活状态                           |
| Link          | 声明式跳转    ~~ push 无激活状态                             |
| Redirect      | 重定向    ~~ replace                                         |
| Route         | 匹配、展示                                                   |
| Switch        | 排他性匹配                                                   |
| Prompt        | 后置守卫                                                     |
| withRouter    | 把不是通过路由切换过来的组件中，将 history、location、match 三个对象传入props对象上 |

## 无状态组件

是个函数，不能访问this对象，也就不存在state、实例方法、钩子、也不需要，只能访问props，无需实例化，渲染性能高，适用场景：展示，纯渲染的地方，别名：UI组件，哑组件，函数式组件，无状态组件，木偶组件

```jsx
const 组件名=(props)=>(jsx)
const 组件名=props=>jsx
const 组件名=(props)=>{
  let xx=props.xx
  return jsx
}
```

## 组件通讯

### **父子**

```jsx
//单项数据流
<Child 属性=数据/>
this.props.属性
```

### **子父**

```jsx
//反向数据流
<Child 属性=父方法/>
this.props.属性(子数据)
```

### **中间人**

```jsx
<ChildA 属性=父方法/>
<ChildB 属性=接受的a数据/>
```

> 所有 React 组件都必须是纯函数，并禁止修改其自身 props
>
> 纯函数不会试图改变它们的输入，并且对于同样的输入,始终可以得到相同的结果,React
> 		组件都必须是纯函数，并禁止修改其自身 props

### **转发 refs**

Forwarding refs，将 ref 通过组件传递给其子节点的技术。它对于可复用组件库和高阶组件（HOC）等情况非常有用

```jsx
this.inputRef = React.createRef()//构造器
<子组件 ref={this.inputRef} />
  
//子组件是个函数时
const 子组件 = React.forwardRef((props, ref) => (
  ...
  <input type="text"  ref={ref}/>)
  ...                       
);
```

### **context组件上下文**

Context 旨在共享一个组件树内可被视为 “全局” 的数据，达到越级传递，场景：当前经过身份验证的用户，主题或首选语言，包括管理当前的 locale，theme，或者一些缓存数据

**老api**

```jsx
//顶层组件 类属性 组件属性 定义子上下文类型
static childContextTypes={
  msg: propTypes.string,
  setMsg : propTypes.func
};

getChildContext(){//返回上下文对象
  return {
    msg:this.state.msg,
    setMsg:this.setMsg
  }
}

//下层组件 类属性 组件属性 接受上下文
static contextTypes = {
  msg: propTypes.string,
  setMsg: propTypes.func
};

//使用
this.context.msg | this.context.setMsg(数据)
```

**新api**

```jsx
//Context
import {createContext} from 'react'
const Context = createContext(默认值);//默认值可以不给
export default Context

//祖先组件  Context.Provider包裹组件并且传递属性值
import Context from './Context';
class 祖先组件 extends Component {
  
  state = {
    count: 60
  };

  render() {
    const { count } = this.state;
    return (
      <Context.Provider value={count}>
        ...
        <中间件层组件 />
        ...
      </Context.Provider>
    );
  }
}

//后代组件 Context.Consumer来接收值,Consumer里面不能直接渲染其他组件，而是要声明一个函数。函数的参数就是context的值

import Context from './Context';
export default class Leaf extends Component {
  render() {
    return (
      <Context.Consumer>
        {
          value => {
            return (
              <div className="leaf">
                {value}
              </div>
            )
          }
        }
      </Context.Consumer>
    )
  }
}

//封装Context.Provider

import React,{Component} from "react";

import Context from './Context'
export default class Provider extends Component {
  state={
    count:10
    ...
  };

  increment=(val=1,ev)=>this.setState({count:this.state.count+val})
  decrement=(val=1,ev)=>this.setState({count:this.state.count-val})
	...
  
  render(){
    return (
      <Context.Provider value={
        {
          count: this.state.count,
          increment: this.increment,
          decrement: this.decrement
        }
      }>
        {this.props.children}
      </Context.Provider>
    )
  }
}

//使用封装
<Provider>
	<App/>
</Provider>
```



### 订阅发布

pub/sub模式、 消息通知、观察者模式、`yarn add pubsub-js -D`

- 订阅:	token=pubsub.subscribe('消息名',回调函数('消息名',数据))
- 发布：  pubsub.publish('消息名',数据)
- 清除指定订阅：pubsub.unsubscribe(token|'消息名'|回调函数名);
- 清除所有：pubsub.unsubscribeAll()

### **路由**

```jsx
let {history,location,match}=props
import {widthRoute}='react-router-dom'
```

### web存储

localStrage、cookie

### 状态管理

后面学习



## 高阶组件 HOC

又叫Higher-Order Components，是一个函数能够接受一个组件并返回一个新的组件。组件是将props转化成UI，然而高阶组件将一个组价转化成另外一个组件，例如Redux的connect

就是一个函数接受一个组件作为参数，经过一系列加工后，最后返回一个新的组件，withUser函数就是一个高阶组件，它返回了一个新的组件，这个组件具有了它提供的获取用户信息的功能。

```jsx
const withRouter = WrappedComponent => {
  ....  抓取到history,location,match
  return props => <WrappedComponent history={history} {...props} />;
  //return 要求是个类或者函数
};

const Swiper = props => (
  <div class="user-container">
    <p>My name is {props.history}!</p>
  </div>
);
export default withRouter(Swiper);
```

## 渲染属性（Render Props）

**render prop 是一个用于告知组件需要渲染什么内容的函数**,

```jsx
class Mouse extends React.Component{

  mouseOver = () => {console.log('over')};
  mouseOut = () => {console.log('out')};

  render(){
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.render()}
      </div>
    )
  }
}

//
<Mouse render={()=>{
    return (
      <>
        <h3>标题</h3>
        <p>段落</p>
        <p>段落</p>
        <p>段落</p>
      </>
    )
  }}/>
```



## 状态管理

- 思想：flux
- 实现：vuex  redux

### redux

可以同一个地方查询状态，改变状态，传播状态，用在中大项目,组件状态需要共享，在任何地方都可以拿到，组件需要改变全局状态，一个组件需要改变另外一个组件的状态，创建store实例，其他组件导入并共享这个store实例

**redux成员**

| 成员            | 作用                      | 类型 |
| --------------- | ------------------------- | ---- |
| createStore     | 创建store实例             | 函数 |
| combineReducers | 合并多个reducer           | 函数 |
| applyMiddleware | 安装中间件，改装增强redux | 函数 |

**store成员**

| 成员           | 作用                                           | 类型 |
| -------------- | ---------------------------------------------- | ---- |
| subscribe      | 订阅state变化                                  | 函数 |
| dispatch       | 发送action 给 reducer                          | 函数 |
| getState       | 获取一次state的值                              | 函数 |
| replaceReducer | 一般在 Webpack Code-Splitting 按需加载的时候用 | 函数 |

**数据流动**

| component（views）  | action              | reducer                                    | state    | component（views） |
| ------------------- | ------------------- | ------------------------------------------ | -------- | ------------------ |
| 展示state           | 转发的动作,异步业务 | 同步业务处理逻辑, 修改state，并且返回state | 状态收集 |                    |
| store.dispatch---》 | -------------》     |                                            |          | 《--subscribe      |
|                     |                     |                                            |          | 《--getState       |

**操作流程**

```jsx
import {createStore} from 'redux'

//生成默认state 
let defaultState={}

//创建reducer
const reducer = (state=defaultState,action)=>{
  let {type,payload}=action    
  swtich type
    case XXXXX
    更新copy后的state  Object.assign(空,老,新)
  default:
    return state
}

//创建store对象
store = createStore(reducer,state)
export default store;

//组件内部更新，状态获取state
import store from '...'
store.dispatch({type:xxx,payload:ooo}) //发送action给reducer  type是必传参数
store.subscribe(回调)  //订阅 state  更新state时触发
store.getState() //获取状态，执行一次
```

提取并定义 **Action Creators**

```jsx
let nextTodoId = 0;

export const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text
});

export const removeTodo = id => ({
  type: "REMOVE_TODO",
  id
});

export const checkNav = bl => ({
  type: "CHECK_NAV",
  bl
});

//处理异步
const updateHome = (collectionName) => dispatch => { //dispatch接受函数 需要thunk中间件
  return axios.get({api:collectionName}).then(
    res=> {
      dispatch({type:'UPDATE_HOME',payload:res.data.data});
      return res//有回执
    }
  )
};

//安装中间件改装 redux
import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
let store = createStore(rootReducer,rootState,applyMiddleware(thunk));

//组件内部
dispatch(checkNav(!bNav))
dispatch(addTodo('呵呵哒'))
```

**combineReducers**提取reducer

当应用逻辑逐渐复杂的时候，我们就要考虑将巨大的 Reducer 函数拆分成一个个独立的单元，这在算法中被称为 ”分而治之“，Reducers 在 Redux 中实际上是用来处理 Store 中存储的 State 中的某个部分，一个 Reducer 和 State 对象树中的某个属性一一对应，一个 Reducer 负责处理 State 中对应的那个属性

```jsx
// src/plugins/redux
import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import todos from '../store/reducers/todos'
import bNav from '../store/reducers/nav'
let rootReducer=combineReducers({bNav,todos});
let store = createStore(rootReducer,applyMiddleware(thunk));
export default store;

// src/store/reducers/todos
let initState=[]

const todos = (todos=initState, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      return [
        ...todos,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    }

    case "REMOVE_TODO": {
      const { id } = action;
      todos.map((item,index) => item.id ===id && todos.splice(index, 1));
      return [...todos]
    }

    case "CHECK_TODO": {
      const { id } = action;
      todos.map((item,index) => item.id ===id && (todos[index].completed=!todos[index].completed));
      return [...todos]
    }

    default:
      return todos;
  }
};

export default todos;

// src/store/reducers/bNav
const bNav = (bNav=false, action) => {
  switch (action.type) {
    case "CHECK_NAV": {
      const { bl } = action;
      return bl
    }

    default:
      return bNav;
  }
};

export default bNav;
```

> state数据不写在构造器内订阅，可以写在主入口文件 订阅reactdom的更新

```jsx
let render = ()=>{
    ReactDOM.render(
      <App/>,
      document.getElementById('root')
    )
};
render();
store.subscribe(render);
```

### react-redux

基于redux思想,专门为react使用redux而生，把组件拆分为容器组件, UI组件,所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它

#### UI组件

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用this.state这个变量）
- 所有数据都由参数（this.props）提供
- 不使用任何 Redux 的 API

#### 容器组件

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

#### 最佳实现

```jsx
//主入口
import {Provider} from react-redux
import store from './plugins/redux'
<Provider store={redux打造的store}>
  <容器组件/>
</Provider>
  
  
        
//Creators改装  把异步actins内部有关，api请求的通用部分封装出来的一个过程

//api
const get = ({api,_page=1,_limit=10,id=null}) => (
  axios({
    url: id ? `/mock/${api}/${id}` : `/mock/${api}`,
    params: {_page,_limit}
  })
);

//actionsCreators
const clearHome={type: 'CLEAR_HOME'};//dispatch接受对象 默认

const updateHome = () => dispatch => { //dispatch接受函数 需要thunk中间件
  return get({api:'home'}).then(
    res=> {
      dispatch({type:'UPDATE_HOME',payload:res.data.data});
      return res//有回执
    }
  )
};

const updateBANNER=()=>async dispatch => {
  let res = await get({api:'banner'});
  dispatch({type:'UPDATE_BANNER',payload:res.data.data})
};

export {clearHome,updateHome,updateBANNER}


//UI组件 
const Home = ({home, banner,dispatch}) => {
  useEffect(() => {
    dispatch(clearHome);
    dispatch(updateHome()).then(data => 收取回执)
    dispatch(updateBANNER())
  }, []);
  
  return (
    <div className="Home">

      <Swiper data={banner}/>
      {
        home.map(item => (
          <Cell key={item.id} item={item} dataName="home"/>
        ))
      }

    </div>
  )
};

//容器组件 dispatch方法 默认传递给UI组件
export default connect(
  state=>({banner:state.banner, home:state.home})
)(Home)
```

**redux-devtools使用**

```jsx
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
//compose 增强器

import thunk from 'redux-thunk'

let rootReducer = combineReducers({banner, column, detail, follow, home, user});

//使用redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));//安装了中间件，改装了redux

export default store;
```



**token加入redux 做持久化处理**

思路：登录种cookie同步redux，axios拦截器只读redux，为了速度，index主入口读取cookie同步redux为了强刷做好准备，**跳转有axios完成**， 问题是组件会渲染，再去跳转

思路2：redux里面准备一条数据，axios和其他组件都去修改他 , 界面根据这条数据，**最外层的auth组件响应式渲染**

```jsx
//app.jsx
export const connect(user=> state.user)(function Auth({user:{err}}){
    if (err==1) { return <Login /> }
    if (err==3) { return <Reg /> }
    return <App />
})
```

思想3： 全局路由守卫，axios和其他组件负责跳转



## 片段

为一个组件返回多个元素。 可以让你将子元素列表添加到一个分组中，并且不会在DOM中增加额外节点

```jsx
<React.Fragment key="bmw"></..>
<></>
```





## 异步组件

把静态导入的组件，变成一个可以返回promise的函数，函数内部在路由跳转时，去异步加载目标组件，关键字import()，create-react-app 环境 webpack自动分片打包

```jsx
//import 语法
import ("./ChildB.js").then(
  ChildB=>console.log(ChildB)
)

//方式1
const Child = asyncComponent(()=>import("./Child"))

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

//方式2
import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;
const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
  loading:()=>{return null}
});
```

## PureComponent

- 使用PureCompoent是因为它是一个更具性能的Component的版本
- 性能的提高还伴随着一些附加的条件
- 提供了具有浅比较的shouldComponentUpdate方法
- 当props或者state改变时，PureComponent将对props和state进行浅比较
- Component的shouldComponentUpdate构造被调用默认重渲，PureCompoent不一定
- 不能再重写shouldComponentUpdate
- 不渲染的情况: 父组件中改变对象,子组件比较的是引用是否相同，
- 不要在`render`方法中创建一个新的函数，对象或者是数组
- 场景：组件收到的props和定义的state是基本类型时***

## 单页滚动条

路由切换，每次切换到页面顶部 

```jsx
static getDerivedStateFromProps(nextProps){//props改变时
  if(this.props.location !== nextProps.location){//当前地址不等于目标地址
    window.scrollTo(0,0);//滚动到顶部
  }
}
```

页面切换出去再切换回来后怎样保持之前的滚动位置

```jsx
//sTop =  模块内部变量 | 类属性
componentDidMount(){
  window.scrollTo(0,sTop)
}
componentWillUnmount(){
  sTop = document.documentElement.scrollTop
}			
```

