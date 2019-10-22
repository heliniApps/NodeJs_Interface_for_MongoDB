var MongoClient = require('mongodb').MongoClient;
var Hapi = require('hapi');

var url = "mongodb://localhost:27017/learning_mongo";
var server = new Hapi.Server();

server.connection({
    port:8080
})

server.route(
    [
        {
            method: 'GET',
            path: '/api/tours',
            config: { json:{ space:2 } },
            handler: function(request, reply){

                var findObject = {}
                for(var key in request.query){
                    findObject[key] = request.query[key];
                }
                collections.find(findObject).toArray(function(err, tours){
                    reply(tours);
                })
            }

        }
    ]
)

function getCollections(db, callback){

    collection = db.collection('tours');

    collection.count(function(err, count){
        console.log(count);
        callback;
    })

    collection.find({"tourPrice":{$gte:1200}}).toArray(function(err, tours){
        console.log(tours);
        callback;
    })
}

MongoClient.connect(url, function(error, db){
    console.log("Succesfully connected to Mongo DB server..");

    //getCollections(db, function(){
    //    db.close();
    //})

    collections = db.collection('tours');
    server.start(function(err){
        console.log("Hapi Server is started and listening to http://localhost:8080..");
    })
})
