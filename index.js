// The imported libraries
const express = require('express');
const cors = require('cors')
const mysql = require('mysql')
require('dotenv').config();

// Create the app in express and add CORS
const app = express();
app.use(cors('*'))
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

// Connect to MySQL database
const pool = mysql.createPool({
    connectionLimit: 80,
    host:'database-1.cfuiol0s5ewa.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:process.env.pswd,
    database:'house'
})

// Function to get all the contacts from the database
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

// Endpoint to read the contacts
app.post('/read_contacts', function(req, res){
    get_contact(res)
})

// Endpoint to add contact
app.post('/add_contact', function(req, res){
    req.on('data', chunk => {
        let data = JSON.parse(chunk).data
        var query = pool.query(`insert into phonebook (first_name,last_name,phone,email,detail) values("${data.first_name}","${data.last_name}","${data.phone}","${data.email}","${data.detail}");`);
        query
        .on('error', function(err) {
            res.send({data:"error",detail:err})
        })
        .on('end', async function() {
            get_contact(res,"del")
        });
    })
})

// Endpoint to delete contact
app.post('/delete_contact', function(req, res){
    req.on('data', chunk => {
        let toDelete = {}
        toDelete = JSON.parse(chunk).data
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

// Endpoint to update contact
app.post('/edit_contact', function(req, res){
    req.on('data', chunk => {
        let toEdit = {}
        toEdit = JSON.parse(chunk).data
        var query = pool.query(`update phonebook SET first_name = "${toEdit.first_name}", last_name = "${toEdit.last_name}", phone = "${toEdit.phone}", email = "${toEdit.email}", detail = "${toEdit.detail}" where id = "${toEdit.id}";`);
        query
        .on('error', function(err) {
            res.send({data:"error",detail:err})
        })
        .on('end', async function() {
            get_contact(res,"del")
        });
    })
})

app.listen(3370, () => console.log('listening'))