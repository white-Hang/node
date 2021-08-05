/*
    students.js
    数据操作文件模块
    职责：操作文件中到数据，只处理数据，不关心业务
*/

const fs= require('fs')
const nanoid  = require('nanoid')
const dbPath = './db.json'
/**
 * 获取所有学生列表 
 * callback中到参数
 * 第一个参数是err
 * 成功是null
 * 失败是错误对象
 * 第二个参数是结果
 * 成功是数组
 * 失败是undefined
 */
exports.find=function(callback){
    fs.readFile(dbPath,'utf8',(err,data)=>{
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

 /**
 * 添加保存学生
 */

exports.save=function(student,callback){
    fs.readFile(dbPath,'utf8',(err,data)=>{
        if(err){
            return callback(err)
        }
        const students=JSON.parse(data).students
        student.id= new Date().getTime()
        console.log(nanoid)
        students.push(student)
        const fileData=JSON.stringify({
            students
        })
        fs.writeFile(dbPath,fileData,(err)=>{
            if(err){
                //错误就是把错误对象传递给它
               return callback(err)
            }
            //成功就没错，所有错误对象是null
            callback(null)
        })
    })
}

  /**
 * 更新学生
 */

exports.updateById=function(student,callback){
    fs.readFile(dbPath,'utf8',(err,data)=>{
        if(err){
            return callback(err)
        }
        const students=JSON.parse(data).students
        const currentStudent = students.find(item=>item.id===parseInt(student.id))
        Object.assign(currentStudent,student)
        const fileData=JSON.stringify({
            students
        })
        fs.writeFile(dbPath,fileData,(err)=>{
            if(err){
                //错误就是把错误对象传递给它
               return callback(err)
            }
            //成功就没错，所有错误对象是null
            callback(null)
        })
    })
}

exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',(err,data)=>{
        if(err){
            return callback(err)
        }
        const students=JSON.parse(data).students
        const currentStudent = students.find(item=>item.id===id)
        callback(null,currentStudent)
    })
}


  /**
 * 删除学生
 */

exports.delete=function(id,callback){
    fs.readFile(dbPath,'utf8',(err,data)=>{
        if(err){
            return callback(err)
        }
        const students=JSON.parse(data).students
        const currentIndex = students.findIndex(item=>item.id===parseInt(id))
        currentIndex&&students.splice(currentIndex,1)
        const fileData=JSON.stringify({
            students
        })
        fs.writeFile(dbPath,fileData,(err)=>{
            if(err){
                //错误就是把错误对象传递给它
               return callback(err)
            }
            //成功就没错，所有错误对象是null
            callback(null)
        })
    })
}