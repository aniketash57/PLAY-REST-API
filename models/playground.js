const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create geo schema 
/*
    using geometry property of geo json 
    "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  }
*/
const GeoSchema = new Schema({
    type:{
        type: String ,//dont get confused with type this is type of data and above type is type of geometry i.e point or rectangle or whatever
        default:"Point"
    },
    coordinates:{
        type : [Number],
        index:"2dsphere"//mongo db uses two types 2d and 2d sphere in 2d it's directly straight line but in 2d sphere curvature of earth is taken into account
    }
});
const PlaygroundSchema= new Schema(
    {
        // id : { 
        //     type : string , 
        //     required : [true , "id is required"]
        // },
        name : {
            type : String ,
            required : [true, "name is required"]
        }
        ,
        rating:{
            type: String
        },
        available:{
            type: Boolean,
            default: false
        },
        geometry:GeoSchema
        //add in geo location 
    }
    );
    const playground = mongoose.model("playground",PlaygroundSchema)
    module.exports=playground;
    