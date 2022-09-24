const express= require("express");
const routes = require("./routes/api.js")
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/playgrounddb');
const bodyParser = require("body-parser");
//we will use express.static to send some jpeg or images back to user and it should come before all middlewares as after that it should not go any further
app.use(express.static('public'));

//body parser pehle hona chahiye call routes se 
app.use(bodyParser.json());//middleware to parse data before sending to 

app.use('/api',routes);//use is basically used to call a middle ware 

//now we will use error handling middle ware 
app.use(function(err,req,res,next){//function k argument me error rhega tab hi jayega iske andar aur jab koi error aayega tab hi 
    console.log(err);
    res.status(422).send({error : err.message});
})
app.get('/',(req,res)=>{
    res.send('home page');
    
});

app.listen(3000,()=>
{
    console.log("server is online");
})