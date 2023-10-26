const http = require('http')

const server = http.createServer()
server.on('request', (req, res)=>{
    console.log(`有人发送了请求 ${req.url} - ${req.method}`)
    const str = `你发送了请求 ${req.url} - ${req.method}`
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(str)
})

// server.listen(8000, ()=>{
//     console.log('服务器运行在8000端口')
// })

console.log(module)