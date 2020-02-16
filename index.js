const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'dest/' })

const app = express()

app.get('/', (req, resp, next) => {
    resp.send('hello nodejs')
})

app.post('/fsubmit', upload.single('file'), (req, resp) => {
    console.log('form表单提交的请求不会报错跨域')
    console.log(req.file)
    resp.send(req.file.filename)
})
app.post('/asubmit', upload.single('file'), (req, resp) => {
    console.log('ajax提交的会报错跨域')
    console.log(req.file)
    resp.setHeader('Access-Control-Allow-Origin', 'null')
    resp.send(req.file.filename)
})

app.get('/preview/:id', (req, resp) => {
    let id = req.params.id
    console.log(id)
    resp.sendFile(`dest/${id}`, {
        root: __dirname,
        headers: {
            'Content-Type': 'image/jpeg'
        }
    }, err => {
        resp.status(404).send('Not Found')
    })
})



app.listen(3000)