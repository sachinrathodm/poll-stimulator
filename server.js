const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
var values = []
var voting = {}
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())
// Parse JSON bodies (as sent by API clients)

app.use(express.json())

app.set('view engine', 'ejs')

//dashboard
app.get('/', (req, res) => {
    res.render('dashBoard')
})

//AddMember
app.post('/SendRollNo', (req, res) => {
    values.push(req.body.rollno)
    res.render('AddMember')
})

app.get('/getMembers', (req, res) => {
    res.render('GetMembers', { MemberData: values })
})

app.post('/getMembers', (req, res) => {
    console.log(req.body.member)
})

app.get('/addMember', (req, res) => {
    res.render('AddMember')
})

app.get('/vote', (req, res) => {
    res.render('Vote', { MemberData: values })
})

app.post('/vote', (req, res) => {
    var getcnt = voting[req.body.member]
    console.log(getcnt)
    if (getcnt === undefined) {
        voting[req.body.member] = 1
    } else {
        voting[req.body.member] = getcnt + 1
    }
    console.log(voting)
    res.render('Vote', { MemberData: values })
})

//Common
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
