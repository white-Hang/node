// router.js路由模块
// 职责：
// 处理路由
// 根据不同到请求方法+请求路径设置具体到请求处理函数

const fs = require('fs')

const path = require('path')

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

const express = require('express')
const Students = require(path.join(__dirname, './students'))

// 1.创建一个路由容器
const router = express.Router()


// 2.把路由都挂载在router路由容器中

router.get('/student', (req, res) => {
  Students.find()
    .then((resSuccess) => {
        // res.render('index.html', {
        //   fruits: ['pingg', 'xiangjiao', 'juzi'],
        //   students: resSuccess,
        // })
      const data = {
        students: resSuccess,
      }
      res.status(200).send(data)
    })
    .catch((resError) => {
      res.status(500).send('Server error')
    })
})
router.get('/students/new', (req, res) => {
  res.render('news.html')
})

router.post('/students/new', (req, res) => {
    // req.body.nameObj={
    //     age:1,
    //     name:'lalala',
    //     height:'180'
    // }
  Students.create(req.body)
    .then((resSuccess) => {
      res.redirect('/')
    })
    .catch((resError) => {
      res.status(500).send('Server error')
    })
})

router.get('/students/edit', (req, res) => {
  Students.findById(req.query.id)
    .then((resSuccess) => {
      res.render('edit.html', {
        student: resSuccess,
      })
    })
    .catch((resError) => {
      res.status(500).send('Server error')
    })
})

router.post('/students/edit', (req, res) => {
  const student = req.body
  Students.findByIdAndUpdate(req.body.id, student)
    .then((resSuccess) => {
      res.redirect('/')
    })
    .catch((resError) => {
      res.status(500).send('Server error')
    })
})
router.get('/students/delete', (req, res) => {
  const id = req.query.id
  Students.remove({ _id: id })
    .then((resSuccess) => {
      res.redirect('/')
    })
    .catch((resError) => {
      res.status(500).send('Server error')
    })
})

// 3.把router导出
module.exports = router
