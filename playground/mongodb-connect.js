// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); //this code is identical to the code up above but it access the MongoClient props, and the ObjectID for each data in the mongoose database

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {//this connect our data to the database
if(err) {
    return  console.log("Unable to connect to MongoDB server")
} 
console.log("connect to mongoDB server")
// db.collection('Todos').insertOne({
// text: "Something to do",
// completed: false
// }, (err, result) => {
// if(err){
//     return console.log("Unable to insert todo", err);//we also added err here so that it will also print out what causes the error
// }
// console.log(JSON.stringify(result.ops, undefined, 2)) //this prints out what we put into our database
// })

// db.collection("Users").insertOne({
//     // _id: 123, we can also create our unique id
//     name: "Andrew",
//     age: 25,
//     location: "NYC"
// }, (err, result) => {
//     if(err) {
//         return console.log("Unable to insert user", err);
//     }
//     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)) //this return the time stamp i.e the time we created the data
// })


db.close(); //this is used to close the connection with the mongoDB server
}); 