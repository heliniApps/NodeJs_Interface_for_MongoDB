var MongoClient = require('mongodb').MongoClient,
    Hapi = require('hapi');
var assert = require('assert');

var url = "mongodb://localhost:27017/learning_mongo";
var server = new Hapi.Server();

server.connection({
    port:8080   
})

server.route([

    {
        method: 'GET',
        path: '/api/tours',
        config: { json:{ space:2 } },
        handler: function(request, reply) {

            var findObject = {}
            for(var key in request.query){
                findObject[key] = request.query[key];
            }

            collection.find(findObject).toArray(function(err, tours){

                assert.equal(null, err); // If err is not 'null', an error is thrown
                reply(tours);   
            })
        }
    },

    {
        method: 'POST',
        path: '/api/tours',
        config: { json:{ space:2 } },
        handler: function(request, reply) {

            collection.insertOne(request.payload, function(err, result){
                console.log("came into POST..");
                reply(request.payload);   
            })
        }
    },

    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: function(request, reply) {

            // Query parameters can be passed in after specifying the request param (tourName)

            if (request.query.replace == "true"){
                // If replacing the object, insert "tourName" into the request Data.
                request.payload.tourName = request.params.name;

                collection.replaceOne({tourName:request.params.name},
                                      request.payload,   // Using entire request Dataset to replace
                                      function(err, results){
                                          reply(request.query.replace + "  " + 
                                                request.params.name + "  " + 
                                                results + "\n");   
                                      })
            } else {
                console.log("came into put for update.."); 
                collection.updateOne({tourName:request.params.name},
                                     {$set:request.payload},  // setting a particular field
                                     function(err, result){
                                         reply(result);
                                     })
            }
        }

    },

    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: function(request, reply) {

            // DELETE using "tourName" passed in as the  query parameter
            console.log("inside DELETE.. ");

            collection.deleteOne({tourName:request.params.name}, function(err, result){
                reply(result);
            })
        }
    }


])

MongoClient.connect(url, function(error, db){

    console.log("Connected to MongoDB..")

    collection = db.collection('tours');

    server.start(function(err){
        console.log("Listening to Hapi on http://localhost:8080");   
    })
})

