const express = require('express')
const { register, test, login, submitInvitation } = require('./app')
const app = express()


const port = process.env.PORT || 3000

app.use(express.json())

app.get('/register/:count', (req, res) => register(req, res))
app.get('/test/:id', (req, res) => login(req, res))
// app.get('/submit-invitation/:id', (req, res) => submitInvitation(req, res))
app.get('/test', (req, res) => test(req, res))

app.listen(port, () => console.log(`app listening on port ${port}`))