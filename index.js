const express = require('express');
const fs = require('fs');  //produnct data read and local data return if db empty
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
//aurthorized personal atlas db
const uri = "mongodb+srv://12345:<12345>@cluster0.blzej7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//LOCAL DB
const LOCALDB = "mongodb://127.0.0.1:27017/User_Shop_API";

//route protection by json web tokens
const jwt = require('jsonwebtoken');
const UserCollection = require('./models/User');
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });

const app = express();
const port = 3000;
const categoryRoutes = require('./routes/Category_Routes');



app.use(express.json());  //req to json objects
//2.PEODUCT CATEGORY ROUTES :

app.use('/api/v1/categories', categoryRoutes);

//XXXXXXXXXXXXXX2XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//database connection



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(LOCALDB).then(connection => {
    //console.log(connection);==>check of db connection is sucessfull
})






//1.HOME END POINT  
app.get(`/`, (req, res) => {


    res.status(200);
    res.send(`<h5>Welcome to E-COmmerce API 
    <br>
    Mode:${process.env.DEV_MODE}</h5>
    
    <h6> Requests to Server:
    <br>
    0.Run: npm i ==> nodemon index.js
    <br>
    1.<h6>API Home: "localhost:3000/"</h6>
    2.<h5>getAllProductCategories: localhost:3000/api/v1/categories/all</h5>
    <br>
    
    3.<h5>addAProductCategory: localhost:3000/api/v1/add/Int product Id/String Product Category Name</h5>
    <br>
    4.<h5>deleteProductCategory: localhost:3000/api/v1/delete/Int product Id/String Product Category Name</h5>
    <br>
    5.<h5>UpdateProductCategory: localhost:3000/api/v1/update/Int product Id/String Product Category Name</h5>
    <br>
    6.<h5>Admin [protected] route: localhost:3000/api/v1/clearall/Password.</h5>
    <br>
    7.<h5>All other requests are catched by error middleware.</h5>
    `);

});


//..................1.XXXX......................1





//2 protected route 
app.get('/api/v1/clearall/password', (req, res) => {
    var authuser = UserCollection.find({ "password": req.params.password })
        .then((ans) => {

        });
    //user exists in db now verify the token if it is origional one or changed 
    if (authuser != null) {
        //verify the toke
        const token = authuser.jwt_token;
        const skey = authuser.jwt_secret_key;

        try {
            const decoded = jwt.verify(token, skey);  //check if the jwt key matched with db jwt key 
            //  console.log(decoded);
        } catch (error) {
            res.status(404).json({
                status: 'Failed operation!',
                message: 'You don;t have admin acess!!'
            })
            console.error('User not authorized to clear db');
        }
    }
});












//3.INVALID ROUTE MIDDLEWARE
app.all('*', (req, res, next) => {
    res.status(404);
    res.send(`
<div>
<h6>INVALID REQUEST MADE!!!</h1>
</div>

`)
});
//XXXXXX3XXXXXXXXXXXXXXXXXXXXXXXXXX


app.listen(port, () => {
    //application port 
    console.log(`App running on port ${port}`);
});
