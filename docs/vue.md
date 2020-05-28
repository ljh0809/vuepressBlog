## node.js与Vue汇总
### 魔术变量

`__filename 当前运行的js脚本的文件名（可以输出当前运行的这个文件在电脑硬盘中的绝对路径）`

  `console.log(__filename);`

`__dirname 当前运行的js脚本所在文件夹的路径`

  `console.log(__dirname);`

## 模块

#### 1.自定义模块

 `（1）暴漏（抛出）exports(返回的是模块函数)或则module.exports(模块本身)`

`通常情况下module.exports(模块本身)`

`（2）使用 require()来引用`

`exports使用：`

#### 2.内置模块

`Fs---文件系统 就是对系统上面的文件进行读写操作`

`同步  同步操作会阻塞后续代码的实行`

`异步  异步操作不会阻塞后续的代码`

## 文件操作

+ `readdir(path,options,cb(err,ok))     读取目录`

  `path:必须选的 要读取的路径`

   `options:可选 参数`

   `cb() 成功之后的回调函数`

+ `mkdir(path,mode,callback(err))     创建目录`

+ `rename("修改的文件路径"，"新名字"，回调)      重命名`

+ `rmdir("你要删除的目录路径",回调)  删除目录 (只能删除空文件夹)`

+ `unlink  删除文件`

+ `writeFile(filename,data,options,callback)  读取文件内容`

  `filename:文件名`

  `data:写入的数据`

  `options：可选 编码默认utf-8`

  `callback：回调`

## promise语法

*基本语法：*

var promise=new Promise((resolve,reject)=>{

异步处理

异步处理完成了之后

resolve("成功之后调用")

reject("失败的时候调用")

})

##### 例：封装异步删除文件操作

```js
var fs = require("fs");
function del(){
    return new Promise(function(resolve,reject){
        fs.unlink("./a.html",function(err){
            if(!err){
                resolve("成功")
            }
            else{
                reject("失败")
            }
        })
    })
}
//调用
del().then(function(ok){
    console.log(ok)
}).catch(function(err){
    console.log(err)
})
```

# express写法

1.创建一个文件

2.引用express 

3.调用express()

4.开始使用

5.设置监听

# 中间件

把多个路由要使用到的相同功能放进中间件中

```javascript
const express = require("express");
const app = express();
app.use(路径，回调函数(req,res,next))
```



# mongo操作

1.查看所有的数据库   show dbs

2.新增数据库/切换    use （有就切换没有就是新增）     

3.创建一个集合   db.createCollection("集合名字")

4.删除库    (1)必须先用use切换到要删除的库中 (2) db.dropDatabase()

5.创建集合又添加内容   db.集合名.insert({"key":"value"})

6.查看当前库中所有集合  show collections

7.删除集合 db.集合名.drop()

8.向集合中插入一条数据  db.集合名.insert({"key":"value"})

9.向集合中插入多条数据   db.集合名.insert([{"key":"value"},{"key":"value"}])

db.集合名.save({"key":"value"})  save 和 insert区别是save插入数据时id存在就是修改，insert则是报错

10.查看集合所有数据   db,集合名.find()     条件查询   db,集合名.find(查询条件) 

11. 条件运算符查询

    大于  $gt

    小于     $lt

    大于等于 $gte

    小于等于 $lte

    不等于  $ne

 例：db.你要查询的集合.find( {key : {$gt:???} } )

12. 读取指定数量条数  limit()    例：db.集合名.find().limit(数字)

13.跳过指定数量条数 skip()   例：db.集合名.find().skip(数字)


//引用mongoose
var mongoose = require("mongoose");
//设置连接
mongoose.connect("mongodb://localhost:27017/数据库名");
//设置数据库连接对象
var db = mongoose.connection;
//监听
db.on("err",console.error.bind(console,"数据库连接失败"));
db.once("open",()=>{
    consloe.log("数据库连接成功")
})
//创建schema对象
var schema = new mongoose.Schema({
    username:String,
    password:String
})
//设置集合
var colUser = mongoose.model("集合名",schema);


//新增操作
var data  = new colUser({
    username:aaa,
    password:123
})
data.save().then((ok)=>{
    console.log(ok)
}).catch((err)=>{
    console.log(err)
})

//查询操作(查询全部)
colUser.find().then((ok)=>{
    console.log(ok)
}).catch((err)=>{
    console.log(err)
})

//查询指定内容
colUser.find({"username":aaa}).then((ok)=>{
    console.log(ok)
}).catch((err)=>{
    console.log(err)
})

//条件查询
colUser.find({"键":{$gt:值}}).then((ok)=>{
    console.log(ok)
}).catch((err)=>{
    console.log(err)
})

//显示与跳过
colUser.find().limit(1).skip(1).then((ok)=>{
    console.log(ok)
}).catch((err)=>{
    console.log(err)
})

//修改操作
colUser.updata({"username":aaa},{$set:{"username":bbb}},{multi:true}) true为修改全部,默认修改找到的第一条

//删除操作
colUser.remove().then((ok)=>{
    console.log(ok)
}).catch((err)=>{
    console.log(err)
})


# ajax的执行过程

1. **创建Ajax引擎对象**
2. **绑定提交地址**
3. **为Ajax引擎对象绑定监听（监听服务器已将数据响应给引擎监听里面处理响应数据**）
4. **监听里面处理响应数据**
5. **发送请求**

# Restful api

GET :读取

POST: 发送数据

PUT:更新（全部更新）

PATCH:更新（局部更新）

DELETE:删除

# 后台解决跨域

```js
app.use("/", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS');
    next();
})
```

# crypto加密模块

```js
crypto.createHash("md5").update(你要加密的数据).digest("hex")
```

# body-Parser解析模块

```js
//创建解析器
var ue = bodyParser.urlencoded({ extended: false });
```

# 后端如何生成token

```js
const jwt = require("jsonwebtoken");
数据={

Key:val

Key:val

}

密文:“asdjhaskjdhaksjdhkjahzxckjhsd”(自己定义的字符串)

Jwt.sign(数据,密文（自己定义的一个私钥 一段自己写的字符串越乱越好）)
```

# token解密的方式

**const  jwt = require("jsonwebtoken")**

**jwt.verify(你要解密的token,之前加密的密文,回调函数)****



# **注册登录首页流程总结：**

**1.注册的**

**前台页面接收到用户的输入把这个用户输入的内容通过ajax发送给后台---》后台把数据进行加密存储到数据库中**

**给前台返回值成功还是失败**

**如果成功那么前台就提示用户注册成功跳转到登录页面  否则提示用户网络链接超时**

**2.登录**

**前台页面接收到用户的输入把这个用户输入的内容通过ajax发送给后台---》后台加密数据到数据库去查询** 

**如果查询出来的数据长度大于0那么就是登录成功生成token 返回给前台  如果查询出来的内容小于等于0 那么就是登录失败 那么就是给前台错误返回值**

**前台判断是登录正确了还是失败了  如果正确把token存储在本地存储中  并且帮助用户跳转到首页  反之提示用户账号密码失败** 

**3.首页**

**页面加载完毕的时候读取本地存储的数据 发送给后台  后台判断这个token是否有登录成功的信息 如果有 返回给前台正确信息  反之返回给前台错误信息**

**前台就根据后台的返回值来进行判断 如果登录不进行操作 反之提示用户您没有登录 强行把页面跳转到登录页面**



# 图片上传--multer

Multer.diskStorage({//配置 上传图片的文件夹 与文件名

Destination://设置上传资源的路径，注意如果你没有写 他默认会保存在/tem/uploads文件夹在  建议在我们设置上传资源路径的时候这个文件夹提前手工创建

filename保存上传文件的文件名

})

form表单上传属性：enctype="multipart/form-data"


# vue模板语法：{{}}

# v-show

作用：控制一个元素的显示和隐藏（元素背动态设置了display:none）

语法：v-show=”bool” true就是显示  false 就是隐藏（默认）

# v-on

作用：就是给vue来绑定事件的

语法：1.v-on:事件名=“函数()” 2.@事件名=”函数()”

注意：vue中函数写在实例中的 methods配置项中

# v-for

作用：遍历data中的数据

语法：v-for=”(item,index) in 你要遍历的数据”

Item：你每次遍历出来时候得到的数据

Index:每次遍历数据的时候得到的下标

# v-bind

作用:给网页中的html元素绑定属性

语法：1.v-bind:属性名=“值”  2. :属性名=“值”


## v-if

作用:判断是否加载页面元素

语法：v-if=”表达式”  true 加载元素  false 不加载元素

对元素进行显示和隐藏的时候其实是对当前这个dom元素进行新增和删除操作

### v-if和v-show区别

v-show和v-if：v-if在切换的时候对于计算机的资源消耗比较好（安全性高）

，v-show：在页面初始化的时候对计算机的资源消耗比较高（对需要频繁显示和隐藏的元素并且对安全性要求不高的内容来进行使用）

**当** **v-if** **与** **v-for** **一起使用时谁的优先级更高**

v-for 具有比 v-if 更高的优先级，这意味着 v-if 将分别重复运行于每个 v-for 循环中

所以，不推荐v-if和v-for同时使用

### v-else

前提是必须必须必须配合着v-if来进行使用 不能单独使用

作用：配合这v-if来对元素进行显示和隐藏

## v-else-if

当有一项成立的时候进行渲染

## v-text

就是向页面中插入纯文本

### V-html

就是向网页中插入html

### V-once

一次性插值 当数据改变的时候,插值的内容不会更新

# 监听/侦听  watch

作用：可以监听模型数据的改变，当绑定到监听上的模型数据改变了 那么监听就可以触发，来完成具体的功能，

注意：监听watch在初始化的时候不会执行，只有当数据改变之后才会运行

语法：要和el，data，methods同级的位置来进行编写

Watch:{

你要监听的数据( newval(新数据),oldval(旧数据) ){

你要处理的逻辑

}

}

## 事件对象

$event: 事件对象 

（1）按键修饰符：

​	.up (光标上)  .down .ctrl  .enter （回车键）  .space （空格健）

   (2) 事件修饰符:

 .stop 阻止事件冒泡

.capture 事件捕获

.self 只会触发自己范围内的事件，不包含子元素

.once 只会触发一次

.prevent 阻止事件默认行为



# 计算属性

语法：写在于el data methods watch 等属性同级的位置

computed:{

返回的结果数据-变量 ( ) {

return 返回的结果

}

}

# axios语法

## get方式：

axios({

url:请求地址

method:”get”请求方式

params:{key:val,key:val}发送的数据

}) .then((ok)=>{

Cosnole.log(ok)

})

## Post 方式

 var usp = new URLSearchParams();

​        usp.append("age", "18");

​        axios({

​            url: "http://localhost:8848/vue/post",

​            method: "post",

​            data: usp

​          })

​          .then((*res*) => {

​            console.log(res)

​          })

# resource语法

## get请求

 this.$http.get("http://localhost:8848/vue/get", {

​            params: {

​              name: "ljh"

​            }

​          })

​          .then((*res* => {

​            console.log(res)

​          }))

## post请求

 this.$http.post("http://localhost:8848/vue/post", {

​            age: 18

​          }, {

​            emulateJSON: true

​          })

​          .then((*res*) => {

​            console.log(res)

​          })


# 过滤器

全局过滤器：

```js
Vue.filter("过滤器名字",(val)=>{
	return  过滤逻辑
})
```

局部过滤器：

```
filters:{
	过滤器名字(val)=>{
	return  过滤逻辑
	}
}
```

# 生命周期

## 1.创建实例

beforeCreate(实例创建开始) 实例开始初始化，实例开始配置 数据观测 属性 方法这个是后挂载还没有开始 $el里面还没有东西

created(实例创建结束) 实例创建完成 已经配置好了 数据观测 属性 方法 $el没有内容

## 2.模板创建

beforeMount  在挂载之前被调用 相关的render被首次调用

mounted   $el已经有内容

## 3.跟新过程

beforeUpdate  数据准备更新

updated    页面数据已经跟新完成

## 4.销毁过程

beforeDestroy  实例销毁之前调用，实例还是可以正常使用的

destroyed  实例销毁之后被调用 vue实例会把所有的内容解除绑定



#### 问答：

**1.vue页面第一次加载的时候会触发几个钩子**   

**答：第一次加载时触发四个钩子**

**2.vue生命周期的作用**

**答：在生命周期的特定阶段会被自动调用，为我们开发者提供了一个自己执行的逻辑的机会**

**3.vue的生命周期一共几个阶段**

**答：八个阶段**

**4.DOM渲染在那个生命周期中完成**

**答：在mounted中完成**





# 组件

全局组件：

```
Vue.component("组件名",{template:"<div></div>"})
```

多个标签 如果有多个标签的话 必须必须必须要用一个父元素包裹

使用驼峰命名发命名组件名时调用组件必须转小写切中间用 - 隔开

外部组件：

```
 <template id="myTem">
        <div>
            <h1>1111111</h1>
            <h1>1111112</h1>
            <h1>1111113</h1>
            <h1>1111114</h1>
        </div>
    </template>
    
    <script>
       
        Vue.component("demoEl",{
            template:"#myTem"
        })
        new Vue({
            el:"#demoDiv",
            data:{
               
            },
            methods:{
               
            }
        })

   </script>
```

组件里需要定义变量与函数写法：

```
vue.component("组件名",
{template:"<div></div>"},
data:function(){

},
methods:{

})
```

局部组件：

```
Components:{
“组件名”:{
template:””,
data(){
Return{

}
},
methods:{

}
}
}

```

# 父子组件

```
  components:{
                "fu":{
                    template:"#fuTem",
                    data(){
                        return{}
                    },
                    methods:{},
                    // 创建子组件
                    // 子组件是创建在父组件中的
                    components:{
                       "zi":{
                           template:"#ziTem",
                           data(){
                               return{

                               }
                           }
                       } 
                    }
                }
            }
```

## props使用

```
<!-- 1.需要在子组件中定义props 其实就是一个变量（可以接受外部传递进来的数据） -->
        <!-- 基本用法:1.定义 在子组件中与data template methods 等同级创建一个props属性 -->
                <!-- 2.使用props变量 -->
                <!-- 3.传递数据  在调用当前组件的使用 以属性的方式传递进去 -->
```

# 组件传值

正向传值：props  父组件给子组件传递数据

逆向传值：给自定义事件完成（必须通过事件来触发才能传递）

语法   1.抛出自定义事件监听 this.$emit("自定义事件名",传递的数据)

2.在当子组件被调用的时候接收自定义事件的监听（对应一个父组件的函数，但是这个父组件的函数不能加括号）

# 路由

#### 路由定义规则

```js
var routes = [
{name:"给当前路由起个名字"，path:"/设置url",component:你要渲染的组件}
]
```

#### 创建路由实例

```javascript
var router = new VueRouter({
	//固定属性不能变---routes,接收路由规则
	routes:routes,
	
})
```

#### 路由挂载到Vue实例中

固定属性：router:router(路由实例)  

#### 设置路由出口

````
<router-view></router-view>
````



例：

```html
<body>
    <div id="box">
    	<!--路由导航-->
    	<router-link to="/home">点我去home</router-link>
        <!--路由出口-->
        <router-view></router-view>
    </div>

    <template id="tema">
        <div>
            {{txt}}
        </div>
    </template>
    <template id="temb">
        <div>
            {{txt}}
        </div>
    </template>
    <template id="temc">
        <div>
            {{txt}}
        </div>
    </template>
</body>
```

```javascript
<script>
    //定义路由页面组件
    var tema = {
        template: "#tema",
        data() {
            return {
                txt: "组件页面的数据1"
            }
        }
    }
    var temb = {
        template: "#temb",
        data() {
            return {
                txt: "组件页面的数据2"
            }
        }
    }
    var temc = {
            template: "#temc",
            data() {
                return {
                    txt: "组件页面的数据3"
                }
            }
        }
        //路由定义规则
    var routes = [{
            name: "tema",
            path: "/home",
            component: tema
        }, {
            name: "temb",
            path: "/list",
            component: temb
        }, {
            name: "temc",
            path: "/user",
            component: temc
        }]
        //创建路由实例
    var router = new VueRouter({
        routes
    })
    new Vue({
        el: "#box",
        //挂载路由
        router
    })
</script>
```

#### 路由重定向

```javascript
{path:"*",redirect:"/home"}
```

# 路由传参

### params:  

方式一

```
设置：{name:"aa",path:"/user/:要传递参数的名字",}
绑定：<router-link :to="{name:'aa',params:{要传递参数的名字:'传递的参数值'}}">
接收:{{this.$route.params.参数名}}
```

方式二

```
设置：{name:"aa",path:"/user/:要传递参数的名字",}
绑定：<router-link to="/aa/参数1">
```

编程式导航：

```
this.$router.push({name:"aa",params:{要传递参数的名字:'传递的参数值'}})
```

```
this.$router.push("/aa/参数1")
```

### query:

在query模式中进行参数传递的时候不需要不需要在路由规则中配置,直接向你要接受参数的路由中发送参数

方式一

```
<router-link to="/aa?canshu=发送的数据&canshu2=发送的第二个数据">
```

方式二

```
<router-link :to="{name:'aa',query:{要传递参数的名字:'传递的参数值'}}">
```

方式三

```
<router-link :to="{path:'/tema',query:{canshu:'数据1'，canshu2:'数据2'}}">
```



# 路由模式

切换history模式需要在初始化路由对象的时候添加     mode:"history"

```javascript
 var router = new VueRouter({
        routes,
        mode: "history",
    })
```

多级路由使用  children:[]



# 全局守卫

（1）全局前置守卫 beforeEach( (to ,from ,next)=>{} )

to:即将进入到的路由信息

From：离开的路由信息

Next 下一步

```javascript
 router.beforeEach((to, from, next) => {
        if (to.path == "/temb" || to.path == "/temc") {
            next()
        } else {
            alert("请先登录")
            next("/temb")
        }
    })
```

（2）全局后置守卫 afterEach( (to,from)=>{} )

to:即将进入到的路由信息

From：离开的路由信息



路由独享守卫（只会对当前路由进行单一的控制 参数和全局前置守卫相同）

语法：在路由规则上直接定义beforeEnter

 

组件内守卫 

（1）进入组件之后 beforeRouteEnter( to,from ,next )

（2）离开组件的时候 beforeRouteLeave(to,from,next){}

 ```javascript
beforeRouteLeave(to, from, next) {
            if (confirm("确定要离开当前页面吗")) {
                next()
            } else {
                next(false)
            }
        }
 ```

# 移动端视窗设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,minimum-scale=1,maximum-scale=1,user-scalable=no">
```



# 修改脚手架端口

在项目根路径下创建一个文件名为    **vue.config.js**

```javascript
module.exports = {
    devServer: {
        port: 8848,
        host: "127.0.0.1",
        open: true
    }
}
```

# 脚手架 路由

引用路由步骤：在src文件夹下创建router文件夹并创建 index.js 编写路由

例：

````javascript
//普通路由
import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/home/home.vue"
import Team from "@/pages/team/team.vue"
import All from "@/pages/all/all.vue"
import Book from "@/pages/book/book.vue"
import Login from "@/pages/login/login.vue"
import Resgist from "@/pages/resgist/resgist.vue"
import Movie from "@/pages/movie/movie.vue"
import Search from "@/pages/search/search.vue"
import Radio from "@/pages/radio/radio.vue"

Vue.use(Router)

export default new Router({
    routes: [{ name: "home", path: "/home", component: Home }, { name: "team", path: "/team", component: Team }, { name: "all", path: "/all", component: All }, { name: "book", path: "/book", component: Book }, { name: "login", path: "/login", component: Login }, { name: "resgist", path: "/resgist", component: Resgist }, { name: "movie", path: "/movie", component: Movie }, { name: "search", path: "/search", component: Search }, { name: "radio", path: "/radio", component: Radio }]
})

````

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from '@/router/index.js'    //引入
new Vue({
    router,   //调用
    render: h => h(App),
}).$mount('#app')
```



# 路由懒加载

方式1:使用异步方式实现懒加载

````js
Component:resolve=>(require("你要加载的路由地址"),resolve)
````



方式2.常用方式

```js
component:()=>import("要加载的路由路径")
```

````js
import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

export default new Router({
    routes: [{
            name: "home",
            path: "/home",
            component: () =>
                import ("@/pages/home/home.vue")
        }, {
            name: "team",
            path: "/team",
            component: () =>
                import ("@/pages/team/team.vue")
        },
        {
            name: "all",
            path: "/all",
            component: () =>
                import ("@/pages/all/all.vue")
        }, {
            name: "book",
            path: "/book",
            component: () =>
                import ("@/pages/book/book.vue")
        }, {
            name: "login",
            path: "/login",
            component: () =>
                import ("@/pages/login/login.vue")
        },
        {
            name: "resgist",
            path: "/resgist",
            component: () => ("@/pages/resgist/resgist.vue")
        },
        {
            name: "movie",
            path: "/movie",
            component: () =>
                import ("@/pages/movie/movie.vue")
        }, {
            name: "search",
            path: "/search",
            component: () =>
                import ("@/pages/search/search.vue")
        }, {
            name: "radio",
            path: "/radio",
            component: () =>
                import ("@/pages/radio/radio.vue")
        }
    ]
})
````





# 动态组件

让多个组件用同一个挂载点,动态进行切换

````
<component :is="变量"></component>
````



解决状态丢失

<keep-alive> 包裹你想要渲染的路由出口</keep-alive>


# axios

全局引用：在src下的main.js中

```js
import axios  from "axios";
Vue.prototype.axios=axios
```

语法：

```js
axios({
url:”路径“,
method:”请求方式get”,
params:{
Key:val
}
}).then(
(ok)=>{}
)

```



# 代理跨越

在vue.config.js文件下设置,与port,host等同级

```
  proxy:{
            "/api":{
                target:"http://localhost:3000",//代理帮助你请求的具体是那个服务
                changeOrign:true,//开启代理
                pathRewrite:{  //格式化path
                    "^/api":""
                }
            }
```



# mock

引用：

```
var Mock = require("mockjs")
Mock.mock("拦截的地址"，"post/get",拦截后返回的数据)
```



# 解决跨域获取数据问题，加入meat标签

```html
<meta name="referrer" content="no-referrer">
```



# 自定义指令

语法：与data methods 等属性同级

```
directives:{
自定义指令的名字:{
自定义指令的钩子函数( el绑定指令的当前元素 ){

		}	
	}
}

```

1.bind   绑定指令到元素上只执行一次

2.inserted  绑定指令到元素在插入页面展示的时候调用  

3.updata  组件节点更新的时候调用

4.componentUpdated  指令所在组件的节点以及他的自节点全部都更新完成之后调用

5.unbind  指令被删除的时候执行一次



# 组件传值

1.正向传值

```vue
//父组件
<template>
    <div>
        我是父组件
        <Zi :fuTxt="txt"></Zi>
    </div>
</template>

<script>
import Zi from "./zi.vue"
export default {
   components:{
        Zi,
   },
    data() {
        return {
            txt:"我是父组件传过来的值"
        }
    },
}
</script>

//子组件
<template>
    <div>
        我是子组件----{{fuTxt}}
    </div>
</template>

<script>
export default {
    props:["fuTxt"]
}
</script>
```

2.逆向传值

```vue
//父组件
<template>
    <div>
        我是父组件----{{fuTxt}}
        <Zi @zipao="fufun"></Zi>
    </div>
</template>

<script>
import Zi from "./zi"
export default {
    components:{
        Zi
    },
    data() {
        return {
            fuTxt:"我是默认父组件数据"
        }
    },
    methods: {
        fufun(val){
            this.fuTxt=val
        }
    },
}
</script>

//子组件
<template>
    <div>
       我是子组件 
       <button @click="zifun()">点我传数据</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ziTxt:"我是子组件传过来的数据"
        }
    },
    methods: {
        zifun(){
            this.$emit("zipao",this.ziTxt)
        }
    },
}
</script>
```

## 同胞传值

使用:

1.src下创建一个event的文件夹----》创建一个index.js用来存放新创建的vue实例，担起传值的作用

```js
import Vue from "vue"
export default new Vue
```

2.在a组件中，引用中央事件总线的js  接下来还需要通过一个事件作出一个自定义事件抛出

3.在需要接收数据的b组件中引用中央事件总线，在生命周期的mounted中调用监听自定义的事件，把传递过来的数据交给$on（监听器）

````vue
//a组件
<template>
    <div>
       中央事件子a组件  
       <button @click="fun()">点我传值给兄弟组件</button>
    </div>
</template>
<script>
import eventBus from "@/event/index.js"
export default {
    data() {
        return {
            txt:"我是子a的数据"
        }
    },
    methods: {
        fun(){
            eventBus.$emit("pao",this.txt)
        }
    },
}
</script>

//b组件
<template>
    <div>
       中央事件子b组件--- {{txt}} 
    </div>
</template>
<script>
import eventBus from "@/event/index.js"
export default {
    mounted() {
        eventBus.$on("pao",(val)=>{
            this.txt=val
        })
    },
    data() {
        return {
            txt:"我是默认数据"
        }
    },
}
</script>



````



# Vuex

## 使用store

1.在src文件夹下创建一个store的文件夹来存储vuex

2.创建实例

````js
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export var store = new Vuex.Store({

})
````

3.在main.js中引入

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//引入
import { store } from '@/store/store.js'

new Vue({
    //调用
    store,
    render: h => h(App),
}).$mount('#app')
```

4.读取state数据

语法:this.$store.state.xxxx

```vue
{{this.$store.state.arr[2].age}}
```

state里面存储的数据是响应式 组件的数据从state中读取出来之后如果state里面的数据发生了改变 那么以来这条数据的组件也会发生数据的更新

## getters

语法:和state同级

```
 getters: {
        newarr(state) {
            var obj = state.arr.filter((v) => {
                if (v.age > 17) {
                    return v
                }
            })
            return obj
        }
    }
```

```
<li v-for="(v,i) in this.$store.getters.newarr " :key="i">
```



# Mutations 

在对vuex中的state数据进行修改的时候，需要把所有的修改逻辑放到mutations(mutations 里面都是一个改变数据的方法的集合)

## 语法：与state getters同级

```js
mutations:{
add(state){
state.arr[0].age++
}
}
```

触发mutations中的修改操作: this.$store.commit(“xxx”,参数的传递)

````
fun(){
this.$store.commit("add")
}
````

# Actions

## 语法: state. Getters mutations的同级

```
actions:{
 ajaxLink(store){
 	var ok="请求来的数据";
 	store.commit("uptext",ok)
 }
}
```

调用才会执行：

This.$store.dispatch( “xxxxx”,传递参数 )

```
funb(){
	this.$store.dispatch("ajaxLink")
}
```

# Mixins

1.在src下创建文件夹Mixins并创建index.js   例如

```js
var Mixins = {
data(){
return{
txt:"111"
	}
	}
},
methods:{
	fun(){
		console.log("我是多个组件中的相同方法")
	}
}
export default Mixins
```

2.引入

```
improt Mixins from "@/Mixins/index.js"
export default{
	mixins:[Mixins]
}
```

# ref

绑定在dom上

```
<template>
	<div>
		<input type="text" ref="aa">
	</div>
</template>
```

获取

this.$refs.aa