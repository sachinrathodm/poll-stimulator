const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { error } = require('console')
const port = 3000
var values = []

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())
// Parse JSON bodies (as sent by API clients)

app.use(express.json())

app.set('view engine', 'ejs')

//dashboard
app.get('/', (req, res) => {
    res.render('dashBoard')
})

app.get('/adminside', (req, res) => {
    res.render('Admin')
})
app.get('/votingside', (req, res) => {
    res.render('Voter')
})

//AddMember
app.post('/SendRollNo', (req, res) => {
    var temp = { name: req.body.rollno, vote: 0 }
    var index = values.findIndex(
        (valuesname) => valuesname.name === req.body.rollno
    )
    console.log(values)
    console.log(index)
    if (index === -1) {
        values.push(temp)
        res.render('AddMember')
    } else {
        res.render('AddMember', { texterror: 'member is already register.' })
    }
})

app.get('/getPollResulte', (req, res) => {
    values.sort((x, y) => (x.vote < y.vote ? 1 : -1))
    res.render('PollResulte', { polldata: values })
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
    var index = values.findIndex(
        (valuesname) => valuesname.name === req.body.member
    )

    if (index !== -1) {
        values[index].vote = values[index].vote + 1
    } else {
        res.render('Vote', { texterror: 'member not defined in list' })
    }

    console.log(values)
    res.render('Vote', { MemberData: values })
})

//Common
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
