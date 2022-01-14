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

app.post('/read_contacts', function(req, res){
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
        res.send({data:result})
    });
})

app.post('/add_contact', function(req, res){
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        console.log(JSON.parse(data))
    })

    // let data = {fName:"Khaled", lName:"Abouseada", phone:"3478523322", email:"khaled.abouseada@icloud.com",detail:"N/A"}
    // var query = pool.query(`insert into phonebook (first_name,last_name,phone,email,more_detail) values("${data.fName}","${data.lName}","${data.phone}","${data.email}","${data.detail}");`);
    // query

})


app.get('/api', function(req, res){
    res.send({data:"hi"})
})

app.listen(3370, () => console.log('listening'))