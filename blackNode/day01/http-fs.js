//1.结合fs发送文件中的数据
//2.Content-Type
// http://tool.oschina.net/commons
//不同的资源对应的Content-TypeContent-Type是不一样的
//图片不需要指定编码
//一般只为字符数据才指定编码
const fs = require('fs')

const http = require('http')

const server = http.createServer()

server.on('request',(req,res)=>{
    if(req.url==='/'){
        fs.readFile('../resource/1.html',(err,data)=>{
            if(err){
                res.setHeader('Content-Type','text/plain;charSet=utf-8')
                res.end('文件读取失败，请稍后再试')
            }else{
                console.log(data.toString(),'data')
                //data默认是2进制数据，可以通过.toString转为咋们能识别的字符串
                //res.end()支持两种数据类型，一种是二进制，一种是字符串
                res.setHeader('Content-Type','text/html;charSet=utf-8')
                res.end(data)
            }
        })
    }else if(req.url==='/img'){
        //url统一资源定位符
        //一个url最终其实是要对应一个资源的
        fs.readFile('../resource/1.jpeg',(err,data)=>{
            if(err){
                res.setHeader('Content-Type','text/plain;charSet=utf-8')
                res.end('文件读取失败，请稍后再试')
            }else{
                //data默认是2进制数据，可以通过.toString转为咋们能识别的字符串
                //res.end()支持两种数据类型，一种是二进制，一种是字符串
                //图片就不需要指定编码，因为我们常说的编码一般指的是字符编码
                res.setHeader('Content-Type','image/jpeg')
                res.end(data)
            }
        })
    } 
})

server.listen('3001',()=>{
    console.log('服务器成功启动！')
})