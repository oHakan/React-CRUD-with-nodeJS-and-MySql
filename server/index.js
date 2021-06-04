const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const passport = require('passport');
const { Strategy } = require('passport-discord');
const session = require("express-session");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

passport.serializeUser((user,done) => {
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null,obj);
})

let Discordtest = new Strategy({
    clientID: "800082712458559528",
    clientSecret: "oREDquza-OlbYGzIkPju9F7FyInX3zh3",
    callbackURL: "http://localhost:3000/dashboard",
    scope: [ "email", "identify"]
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile))
});

passport.use(Discordtest);

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/giris", passport.authenticate("discord", {
    scope: [ "guilds", "identify"]
}));

app.get("/dashboard", passport.authenticate("discord", {
    failureRedirect: "/hata"
}), (req, res) => {
    res.redirect("/")
});


app.get("/api/get", (req, res) => {

    const sqlGetting = "SELECT * FROM nodejs";

    db.query(sqlGetting, (err, result)=>{
       res.send(result)
    });
});


app.post("/api/insert", (req, res,) => {

    const name = req.body.name
    const degree = req.body.degree
    

    db.query("SELECT COUNT(*) AS cnt FROM nodejs WHERE name = ? " , 
    name , function(err , data){
   if(err){
       console.log(err);
       res.send('Hata')
   }   
   else{
       if(data[0].cnt > 0){  
           console.log('Already existing..') 
       }else{
           db.query("INSERT INTO nodejs (name, degree) VALUES (?,?);", [name, degree] , function(err , insert){
               if(err){
                console.log(err)
               }else{
                console.log('Succesfully..')
               }
           })                  
       }
   }
})

});


app.get('/test', function(req, res) {
    res.redirect('test');
  });


  
app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id

    const sqltestdelete = "DELETE FROM nodejs WHERE id = ?"

    db.query(sqltestdelete, id, (err, result)=>{
      if (err) console.log(err);
    })
});

app.put("/api/update/", (req, res) => {
    const id = req.body.id;
    const degree = req.body.degree;

    const sqltestupdate = "UPDATE nodejs SET degree = ? WHERE id = ?"

    db.query(sqltestupdate, [degree, id], (err, result)=>{
      if (err) console.log(err);
    });
});




app.listen(3001, () => {
    console.log('Currently working..')
});