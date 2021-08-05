// app.js入口模块
// 职责：
// 创建服务
// 做一些服务相关配置
// 模版引擎
// body-parser解析表单post请求体
// 提供静态资源服务
// 挂载路由
// 监听端口启动



const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')



app.use('/node_modules',express.static('./node_modules/'))
app.use('/public',express.static('./public/'))

app.engine('html',require('express-art-template'))


//配置模版引擎和body-parser一定要在app.use(router)之前
//配置body-parser中间价（插件，专门用来解析表单post请求体）
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())

// router(app)

//把路由容器挂载到app服务中
app.use(router)



app.listen('3001',()=>{
    console.log('服务开启')
})