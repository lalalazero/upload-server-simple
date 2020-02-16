const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'dest/' })

const app = express()
app.options('/fsubmit', cors())

app.get('/', cors(), (req, resp, next) => {
    resp.send('hello nodejs')
})

app.post('/fsubmit', cors(), upload.single('file'), (req, resp) => {
    resp.send(req.file.filename)
})
app.post('/asubmit', cors(), upload.single('file'), (req, resp) => {
    // resp.setHeader('Access-Control-Allow-Origin', 'null')
    resp.send(req.file.filename)
})

app.get('/preview/:id', cors(), (req, resp) => {
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