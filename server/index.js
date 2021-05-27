const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req, res) => {

    const sqlGetting = "SELECT * FROM nodejs";

    db.query(sqlGetting, (err, result)=>{
       res.send(result)
    });
});


app.post("/api/insert", (req, res) => {

    const name = req.body.name
    const degree = req.body.degree

    const sqlTest = "INSERT INTO nodejs (name, degree) VALUES (?,?);"

    db.query(sqlTest, [name, degree], (err, result)=>{
       console.log(err);
    })
});

app.delete("/api/delete/:name", (req, res) => {
    const name = req.params.name

    const sqltestdelete = "DELETE FROM nodejs WHERE name = ?"

    db.query(sqltestdelete, name, (err, result)=>{
      if (err) console.log(err);
    })
});

app.put("/api/update/", (req, res) => {
    const name = req.body.name;
    const degree = req.body.degree;

    const sqltestupdate = "UPDATE nodejs SET degree = ? WHERE name = ?"

    db.query(sqltestupdate, [degree, name], (err, result)=>{
      if (err) console.log(err);
    });
});




app.listen(3001, () => {
    console.log('Currently working..')
});