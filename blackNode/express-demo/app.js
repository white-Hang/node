// 1.安装
// 2.引包
const { render } = require('art-template')
var express =require('express')
var bodyParser = require('body-parser')
// 3.创建服务器应用程序也就是原来的htty.createSever
var app = express()


//公开指定目录
//只要这样做了，你就可以直接通过/pubilc/xx的方式访问public目录中的所有资源
// app.use('/public/',express.static('./public/'))

//当省略第一个参数的时候，则可以省略/public
// app.use(express.static('./public/'))

//a相当于/public/的别名
app.use('/a/',express.static('./public/'))

//当服务器收到get请求/的时候，执行回调处理函数
// app.get('/',(req,res)=>{
//     //在express中可以直接req.query来获取查询字符串参数
//     console.log(req.query)
//     res.send('hello express!111')
// })

app.get('/about',(req,res)=>{
    res.send('你好，我是帅哥')
})

app.engine('html',require('express-art-template'))

//render方法默认不可用，使用模版引擎可用
// render('html模版名',{模版数据})
//express有一个约定，开发人员把所有的视图文件放在views文件夹下

//配置body-parser中间价（插件，专门用来解析表单post请求体）
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())



app.get('/views',(req,res)=>{
    res.render('index.html',{
        title:"李航"
    })
})


let comments=[
    {name:"李航",message:"李航最帅"}
]
app.get('/post',(req,res)=>{
    res.render('post.html')
})
app.get('/',(req,res)=>{
    res.render('comment.html',{
        comments
    })
})
// app.get('/comment',(req,res)=>{
//     comments.unshift(req.query)
//     res.redirect('/')
// })

app.post('/comment',(req,res)=>{
    console.log(req.body)
    comments.unshift(req.body)
    res.redirect('/')

    //res.statusCode=302
    //res.setHeader('Location','/')
})

//如果要修改默认的views目录，则可以
// app.set('views',render函数的默认路径)

// 如下
// app.set('views','public')

// app.get('/public',(req,res)=>{
//     res.render('js/index.html',{
//         title:"李航"
//     })
// })

//相当于server.listen
app.listen(3001,()=>{
    console.log('app is running at port 3001.')
})