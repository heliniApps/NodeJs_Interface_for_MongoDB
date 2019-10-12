var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/learning_mongo";

function findDocuments(db, callback){

    var collection = db.collection("tours");
    
    collection.find({"tourPrice":1100}).toArray(function(err, docs){
        console.log(docs);
        callback;
    })

}

MongoClient.connect(url, function(err, db){
    console.log("Connected successfully...");

    findDocuments(db, function(){
        db.close();
    })
})

