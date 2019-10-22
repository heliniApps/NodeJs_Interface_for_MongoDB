var MongoClient = require("mongodb").MongoClient;

var url = "mongodb://localhost:27017/learning_mongo";

function findDocuments(db, callback){

    var collection = db.collection("tours");
    
    collection.find({"tourPrice":1100}).toArray(function(err, docs){
        console.log(docs);
        callback;
    })

}

function findSpecifiedDocs(db, findQuery, callback){

    var collection = db.collection("tours");

    collection.find(findQuery).toArray(function(error, docs){
        console.log(docs);
        callback;
    })
}

MongoClient.connect(url, function(err, db){
    console.log("Connected successfully...");

    findDocuments(db, function(){
        db.close();
    })

    findSpecifiedDocs(db, {"tourLength":2}, function(){
        db.close();
    })

    findSpecifiedDocs(db, {"tourLength":{$gte:5}}, function(){
        db.close();
    })
})

