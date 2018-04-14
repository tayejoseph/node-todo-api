// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb'); //this code is identical to the code up above but it access the MongoClient props, and the ObjectID for mangodb

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {//this connect our data to the database
    if (err) {
        return console.log("Unable to connect to MongoDB server")
    }
    console.log("connect to mongoDB server")
    
    // db.collection("Todos").findOneAndUpdate({
    //     _id: new ObjectID("5ad1089765d12cdb73bfb18d")
    // }, {
    //     $set: { //this tells the findOneAndUpdate func to set completed to be true
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false //this make that the updated version be returned
    // }).then((result) => {
    //     console.log(result)
    // })

// db.collection('Users').findOneAndUpdate({
//     name: "Peter"
// }, {
//     $set: {
//         name: "Andrew"
//     }
// }, {
//     returnOriginal: false
// }).then((result) => {
//     console.log(result)
// })

    db.collection('Users').findOneAndUpdate({
    age: 25
}, {
    $inc: {
        age: 1,
        "metrics.orders": 1
    }
}, {
    returnOriginal: false
}).then((result) => {
    console.log(result)
})







    // db.close(); //this is used to close the connection with the mongoDB server
}); 