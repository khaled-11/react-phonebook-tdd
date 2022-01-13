const express = require('express');
const cors = require('cors')
const mysql = require('mysql')
const dotenv = require('dotenv')
require('dotenv').config();

const app = express();
app.use(cors('http://localhost:3000'))
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

const pool = mysql.createPool({
    connectionLimit: 80,
    host:'database-1.cfuiol0s5ewa.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:process.env.pswd,
    database:'house'
})

app.post('/read_contact', function(req, res){
    var query = pool.query(`select * from phonebook;`);
    let result = []
    query
    .on('error', function(err) {
        console.log(err)
    })
    .on('result', async function(row) {
        result[result.length] = row
        console.log(row)
    })
    .on('end', async function() {
        res.send({data:[{firstname:"khaled", lastname:"Abous", phone:"323", email:"re@"},{firstname:"khals1ed", lastname:"Abo13sdus", phone:"32234323", email:"redsdas@"}]})
    });
})


app.post('/add_contact', function(req, res){
    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        console.log(JSON.parse(data))
    })
    res.send({data:"good"})
})

app.get('/api', function(req, res){
    res.send({data:"hi"})
})

app.listen(3370, () => console.log('listening'))