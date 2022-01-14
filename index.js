const express = require('express');
const cors = require('cors')
const mysql = require('mysql')
const dotenv = require('dotenv')
require('dotenv').config();

const app = express();
app.use(cors('*'))
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

function get_contact(res){
    var query = pool.query(`select * from phonebook;`);
    let result = []
    query
    .on('error', function(err) {
        res.send({data:"error",detail:err})
    })
    .on('result', async function(row) {
        result[result.length] = row
    })
    .on('end', async function() {
        res.send({data:result})
    });
}

app.post('/read_contacts', function(req, res){
    get_contact(res)
})

app.post('/add_contact', function(req, res){
    req.on('data', chunk => {
        let data = JSON.parse(chunk).data
        let detail = {fName:`${data.first_name}`, lName:`${data.last_name}`, phone:`${data.phone}`, email:`${data.email}`,detail:`${data.detail}`}
        var query = pool.query(`insert into phonebook (first_name,last_name,phone,email,detail) values("${detail.fName}","${detail.lName}","${detail.phone}","${detail.email}","${detail.detail}");`);
        query
        .on('error', function(err) {
            res.send({data:"error",detail:err})
        })
        .on('end', async function() {
            get_contact(res,"del")
        });
    })
})


// var query = pool.query(`CREATE TABLE IF NOT EXISTS phonebook(id int NOT NULL AUTO_INCREMENT PRIMARY KEY, first_name text, last_name text, phone text, email text, detail text)`);
// query
// .on('error', function(err) {
//     console.log(err)
// })
// .on('result', async function(row) {
//     console.log(row)
// })
// .on('end', async function() {
//     console.log("end")
// });


app.post('/delete_contact', function(req, res){
    req.on('data', chunk => {
        let toDelete = {}
        toDelete = JSON.parse(chunk).data
        console.log(toDelete)
        var query = pool.query(`delete from phonebook where id = "${toDelete.id}";`);
        query
        .on('error', function(err) {
            res.send({data:"error",detail:err})
        })
        .on('end', async function() {
            get_contact(res,"del")
        });
    })
})

app.get('/api', function(req, res){
    res.send({data:"hi"})
})

app.listen(3370, () => console.log('listening'))