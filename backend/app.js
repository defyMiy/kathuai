const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kathuai'
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?"
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json('Login Failed')
        if(data.length > 0){
            return res.json('Login Successfully')
        } else {
            return res.json('No Record')
        }
    })
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

// app.get('/', (req, res) => {
    
// })

app.listen(5000, () => {
    console.log('server started')
})