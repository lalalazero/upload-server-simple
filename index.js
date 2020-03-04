const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'dest/' })

const app = express()

// 单个文件上传
app.options('/asubmit', cors())
app.post('/asubmit', cors(), upload.single('file'), function (req, res, next) {
    res.json({ id: req.file.filename })
})

// 多个文件上传
app.options('msubmit', cors())
app.post('/msubmit', cors(), upload.array('files', 10), function (req, res, next) {
    console.log(req.files)
    let arr = req.files.map(file => file.filename)
    console.log(arr)
    res.send(arr)
})

// 图片预览
app.get('/preview/:id', cors(), function (req, res, next) {
    res.sendFile(`dest/${req.params.id}`, {
        root: __dirname,
        headers: {
            'Content-Type': 'image/jpeg',
        },
    }, (error) => {
        if (error) {
            res.status(404).send('Not found')
        }
    })
})
var port = process.env.PORT || 3000
console.log(`port=${port}`)
app.listen(port, function () {
    console.log('Example app listening on port 3000!')
})