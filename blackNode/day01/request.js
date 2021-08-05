const http = require('http')

const server = http.createServer()

server.on('request',(req,res)=>{
    console.log(req.url,'req')
    if(req.url==='/login'){
        res.write('login')
    }
     if(req.url==='/admin'){
        res.write('admin')
    }
    if(req.url ==='/plain'){
        //text/plain是普通文本格式
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.write('你好，node')
    }
    if(req.url==='/html'){
        //如果你发送的是html格式的字符串，得用text/html
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.write('<p>你好啊，node</p>')
    }
    res.end()
})

server.listen('3001',()=>{
    console.log('服务器成功启动！')
})
