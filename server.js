var fs = require('fs')
var express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/managementdb',{ useNewUrlParser: true });
mongoose.connection.once('open', function(){
    console.log("Success to connect to db")
}).on('error', function (error) {
    console.log(error)
})

var app = new express()

app.use(bodyParser.json())
app.use('/api',require('./routers/api'))

app.use('/dist',express.static('dist'))
app.get('/',function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'})
    var readSteam = fs.createReadStream(__dirname + '/index.html','utf8')
    readSteam.pipe(res)
})

app.listen(8080, function () {
    console.log('Now listening at port 8080')
})
