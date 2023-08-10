const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kathuai'
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?"
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json('Login Failed')
        if(data.length > 0){
            if(req.body.username === 'admin') {
                return res.json({ data:'Login Successfully as admin', usertype:req.body.username })
            } else {
                return res.json({ data:'Login Successfully as user', usertype:req.body.username })
            }
        } else {
            return res.json('No Record')
        }
    })
})

app.get('/user_main', (req, res) => {
    db.query("SELECT * FROM numberdata ORDER BY addwhen DESC", (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/admin_main', (req, res) => {
    db.query("SELECT number, SUM(head) AS head, SUM(tail) AS tail, SUM(toadhead) AS toadhead, SUM(toadtail) AS toadtail, SUM(top) AS top, SUM(bottom) AS bottom, SUM(fourtimes) AS fourtimes FROM numberdata GROUP BY number", (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/check_user', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/create_user', (req, res) => {
    const username = req.body.username
    const password = req.body.password1

    db.query("INSERT INTO users (username, password, roll) VALUES(?,?,?)",
    [username, password, 'user'],
    (err, result) => {
        if(err) {
            console.log(err)
        } else {
            return res.json({data:'Values Inserted'})
        }
    })
})

app.post('/delete', (req, res) => {
    const numberId = req.body.id
    const sql = "DELETE FROM numberdata WHERE id = ?"
    db.query(sql, [numberId], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Number has been deleted")
        }
    })
})

app.post('/delete_user', (req, res) => {
    const numberId = req.body.id
    const sql = "DELETE FROM users WHERE id = ?"
    db.query(sql, [numberId], (err, data) => {
        if(err) {
            return res.json(err)
        } else {
            return res.json("Number has been deleted")
        }
    })
})


app.post('/create', (req, res) => {
    const huainumber = req.body.huainumber
    const head = req.body.head
    const tail = req.body.tail
    const toadhead = req.body.toadhead
    const toadtail = req.body.toadtail
    const top = req.body.top
    const bottom = req.body.bottom
    const fourtimes = req.body.fourtimes
    const addby = req.body.addby
    const addwhen = new Date()
    
    db.query("INSERT INTO numberdata (number, head, tail, toadhead, toadtail, top, bottom, fourtimes, addby, addwhen) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [huainumber, head, tail, toadhead, toadtail, top, bottom, fourtimes, addby, addwhen],
    (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send('Values Inserted')
        }
    })
})

app.get('/', function(req, res, next) {
    res.send("Hello world");
});

app.listen(5000, () => {
    console.log('server started on port 5000')
})