const express = require('express');
const app = express();
const port= 3000;
const bodyParser= require("body-parser");
const path= require('path');
app.use(bodyParser.json());

var jsonParser = bodyParser.json();

const {MongoClient, ServerApiVersion}= require('mongodb');
const { default: mongoose } = require('mongoose');
const uri= "mongodb+srv://troyboy:websci@cluster0.6dafd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID;

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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


// GET - Load all items 
app.get('/db', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db("troyBoyDB").collection("items");
        const cursor = await collection.find().toArray();
        res.json(cursor);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
})

// GET - Filter
async function filterDB(condition, category) {
    try {
        await client.connect();
        const collection = client.db("troyBoyDB").collection("items");
        var query = "";
        if (condition.length != 0 && category.length != 0) {
            query = {$and: [{condition: {$in: condition}}, {category: {$in: category}}]};
        } else if (condition.length == 0 ) {
            query = {category: {$in: category}};
        } else if (category.length == 0) {
            query = {condition: {$in: condition}};
        }
        const cursor = await collection.find(query).toArray();
        return cursor;
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
} 
app.get('/filter/:all', async (req,res) => {
    const filters = JSON.parse(req.params.all);
    const condition = filters[0];
    const category = filters[1];
    const response = await filterDB(condition, category);
    console.log(response);
    res.json(response);
})


// GET - Search key word
async function searchKeyword(keyword) {
    try {
        await client.connect();
        const collection = client.db("troyBoyDB").collection("items");
        // collection.createIndex({title: "text"});
        const query = {$text: {$search: keyword}};
        const cursor = await collection.find(query).toArray();
        return cursor;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
app.get('/search/:keyword', async(req, res) => {
    const keyword = req.params.keyword;
    const response = await searchKeyword(keyword);
    console.log(response);
    res.json(response);
})

// GET - Load single item detail
async function getItem(id) {
    try {
        await client.connect();
        const collection = client.db('troyBoyDB').collection("items");
        const query = {_id: ObjectId(id)};
        const response = await collection.findOne(query);
        return response;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
app.get('/item/:id', async(req, res) => {
    const id = req.params.id;
    const response = await getItem(id);
    // console.log(response);
    res.json(response);
})

// GET - seller basic ingo (how many item sold and name)
async function sellerBasic(id) {
    try {
        await client.connect();
        const collection = client.db('troyBoyDB').collection("profile");
        const query = {_id: ObjectId(id)};
        const projection = {
            lastName: 1,
            firstName: 1,
            itemsSold: 1
        };
        const response = await collection.findOne(query, {projection: projection});
        // console.log(response);
        return response;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
app.get('/sellerBasic/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const response = await sellerBasic(id);
    console.log(response);
    res.json(response);
});

// POST - create a new listing
async function newListing(item) {
    try {
        await client.connect();
        const collection = client.db('troyBoyDB').collection("items");
        await collection.insertOne(item);
        return item._id;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
app.post('/newListing',jsonParser, async (req, res) => {
    const item = req.body;
    console.log(item);
    const id = await newListing(item);
    res.json(id);
})

app.listen(port, () => {
	console.log('Listening on *:3000')
})