// const exp = require("constants");
const express= require("express");
// const ninja = require("../models/playground.js");
const router = express.Router();
const PlayGround = require("../models/playground.js");

router.get("/playgrounds",(req,res,next)=>
{
    // res.send({type:'GET'});
    // var Name = req.query.name;
    // PlayGround.findOne({name : req.query.name}).then(function(ninja)
    // {
    //     res.send(ninja)
    //     console.log(Name);
    // }).catch(next)
    /*
        note : when things come from querry parameter they are string so we have to convert them into number

    */
    // PlayGround.geoNear(
    //     {type:"Point",coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    //     {maxDistance:10000,spherical:true}//distance is in meteres
    // ).then(function(playgrounds)
    // {
    //     res.send(playgrounds);
    // })
    PlayGround.aggregate().near({
        near: {
         'type': 'Point',
         'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis"
       }).then(function(playgrounds)
    {
        res.send(playgrounds);
    })
}); 
router.post("/playgrounds",(req,res,next)=>
{
    // Ninja.create(req.body);
   PlayGround.create(req.body).then(function(ninja)//then takes a function as parameter and gives us the data which it has saved in the database
   {
    res.send(ninja);
   }
   ).catch(next);//move on to next middle ware hai iska meaning 
   
  
});
router.put("/playgrounds/:id",(req,res,next)=>
{
    PlayGround.findByIdAndUpdate({_id : req.params.id},req.body).then(function()
    {
        PlayGround.findOne({_id : req.params.id}).then(
            function(ninja)
            {
                res.send(ninja);
            }
        );
        // .catch(next)
    }).catch(next)  
    // console.log(req.body);
    
})
router.delete("/playgrounds/:playground_id",(req,res,next)=>
{
    const id= req.params.playground_id;//
    PlayGround.findByIdAndRemove({_id: id}).then(function(ninja)
    {
        res.send(ninja);
    }).catch(next);
    // res.send({type:'delete'});

})
module.exports=router;