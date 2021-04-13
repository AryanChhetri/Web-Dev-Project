var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db("gfg");
    dbo.collection("details").findOne({name:"adaddd",password:"sfsdf"},function(err,result){
        if (err) throw err;
        if(result)
            console.log("data found");
        else
            console.log("data not found");
        db.close()
    })
      
    
    
})