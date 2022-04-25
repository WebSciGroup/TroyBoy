const express = require('express');
const app = express();
const bodyParser= require("body-parser");
var http= require('http').Server(app);
var https= require('https');
const path= require('path');
const {MongoClient}= require('mongodb');
const { default: mongoose } = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const uri= "mongodb+srv://troyboy:websci@cluster0.6dafd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var assert= require('assert');
const { callbackify } = require('util');

const PORT= 3000;
app.listen(
    PORT,
    ()=> console.log(`its alive on http://localhost:${PORT}`)
)

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '../frontend/troyBoy/dist/troy-boy')));
// server route handler
app.get('/', function(req, res){
    res.sendFile( __dirname, '../frontend/troyBoy/src/app/app.component.html');
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function searchKeyword2(keyword){
        try{
            await client.connect();
            var db= client.db("troyBoyDB");
            const cursor= await db.collection("profile").find({firstName: keyword}).toArray();
            return cursor;
            // console.log(cursor);
            // return cursor
        }catch(e){
            console.error(e);
        }
}

app.get('/create-user/:keyword', async(req, res)=>{
    const keyword= req.params.keyword;
    console.log(keyword);
    var response= {};
    response= await searchKeyword2(keyword);
    console.log(response);
    res.json(response);
})


// const profileSchema= new mongoose.Schema({
//     firstName:{
//         type: String,
//         required: true
//     },
//     lastName:{
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     orderHistory:{
//         type: String,
//         required: false
//     }
// });

// module.exports= mongoose.model('Profile', profileSchema);
// //'use strict';
// app.get('/create-user', function(req, res){
//     const uri= "mongodb+srv://troyboy:websci@cluster0.6dafd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//     MongoClient.connect(uri, {useUnifiedTopology: true}, function(err, client){
//         const fName= req.query.createFirstName;
//         const lName= req.query.createLastName;
//         const mail= req.query.createEmail;
//         var db= client.db("troyBoyDB");
//         console.log("in POST function for create user");
//         console.log(fName);

//         db.collection("profile").find({firstName: fName}).toArray(function(err, results){
//             res.json(results);
//             console.log(results);
//         })
  
//     });
// });



