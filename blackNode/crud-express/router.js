// router.js路由模块
// 职责：
// 处理路由
// 根据不同到请求方法+请求路径设置具体到请求处理函数

const fs = require('fs')

// module.exports=function(app){
//     app.get('/',(req,res)=>{
//         //readFile的第二个参数可选，传入utf-8就是把读取到的文件按照utf-8的编码方式，或者使用data.toString()
//         fs.readFile('./db.json','utf8',(err,data)=>{
//             if(err){
//                 res.status(500).send('Server error')
//             }
//             //从文件里读取的数据一定是字符串
//             //需要手动转成对象
//             const students = JSON.parse(data).students
//             res.render('index.html',{
//                 fruits:['pingg','xiangjiao','juzi'],
//                 students
//             })
//         })
        
//     })
// }

// express提供了一种更好的方式
// 专门用来包装路由的

const express  = require('express')
const Students = require('./students')



// 1.创建一个路由容器
const router = express.Router()

// 2.把路由都挂载在router路由容器中

    router.get('/',(req,res)=>{
        //readFile的第二个参数可选，传入utf-8就是把读取到的文件按照utf-8的编码方式，或者使用data.toString()
        // fs.readFile('./db.json','utf8',(err,data)=>{
            
        //     //从文件里读取的数据一定是字符串
        //     //需要手动转成对象
            
        // })
        Students.find((err,data)=>{
            if(err){
                res.status(500).send('Server error')
            }
            res.render('index.html',{
                fruits:['pingg','xiangjiao','juzi'],
                students:data
            })
        })
        
    })
    router.get('/students/new',(req,res)=>{
        res.render(
            "news.html"
        )
        
    })

    router.post('/students/new',(req,res)=>{
        // 1.获取表单数据
        // 2.处理
           //将数据保存到db.json中用于持久化
        // 3.发送响应
          //先读取出来，转成对象
        //   然后往对象中push数据
        //   然后把对象转成字符串
        //   然后把字符串再次写入文件
        const student =req.body
        Students.save(student,(err)=>{
            if(err){
                res.status(500).send('Server error')
            }
            res.redirect('/')
        })
        
    })

    router.get('/students/edit',(req,res)=>{
        Students.findById(parseInt(req.query.id),(err,student)=>{
            if(err){
                res.status(500).send('Server error')
            }
            console.log(student,'student')
            res.render('edit.html',{
                student
            })
        })
    })

    router.post('/students/edit',(req,res)=>{
        // 1.获取表单数据
        // 2.处理
           //将数据保存到db.json中用于持久化
        // 3.发送响应
          //先读取出来，转成对象
        //   然后往对象中push数据
        //   然后把对象转成字符串
        //   然后把字符串再次写入文件
        const student =req.body
        Students.updateById(student,(err)=>{
            if(err){
                res.status(500).send('Server error')
            }
            res.redirect('/')
        })
        
    })
    router.get('/students/delete',(req,res)=>{
        // 1.获取表单数据
        // 2.处理
           //将数据保存到db.json中用于持久化
        // 3.发送响应
          //先读取出来，转成对象
        //   然后往对象中push数据
        //   然后把对象转成字符串
        //   然后把字符串再次写入文件
        const id =req.query.id
        Students.delete(id,(err)=>{
            if(err){
                res.status(500).send('Server error')
            }
            res.redirect('/')
        })
        
    })
    
// 3.把router导出
module.exports = router