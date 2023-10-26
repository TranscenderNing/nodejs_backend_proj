const express = require('express')
const path = require('path')


const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('D:\\PostGraduation\\Proj_2422\\newFront\\build'))
app.get('/',(req,res)=>{
    res.sendFile("D:\\PoscltGraduation\\Proj_2422\\newFront\\build\\index.html")
})

app.listen(3011,()=>{
    console.log('express server is running at localhost:3011')
})