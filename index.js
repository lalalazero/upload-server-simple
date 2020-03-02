const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'dest/' })

const app = express()

app.options('/asubmit', cors())
app.post('/asubmit', cors(), upload.single('file'), function (req, res, next) {
    res.json({ id: req.file.filename })
})
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

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})