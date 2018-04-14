const {MongoClient, ObjectID}= require('mongodb');
//the MongoClient below is from the destructured mongodb above
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => { //I think db means database
    if(err) {
        return console.log("Unable to connect to MongoDB server")
    }
    console.log("Connected to MongoDB server");

    // db.collection("Todos").find({
    //     // completed: false  //this will only find the todo collection with their completed values set at false
    //     _id: new ObjectID("5ad0d7ef17472b13a4a3182e") //this looks for todo data with id of "5ad0d7ef17472b13a4a3182e",
    // }).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log("Unable to fetch todos", err);
    // }) //this first of all access the todo under collection in our database and now find something


    
    // db.collection("Todos").find().count().then((count) => { //this is used to count the numbers of datas we have under the todo collection
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log("Unable to fetch todos", err);
    // })

    db.collection('Users').find({name: "Andrew"}).toArray().then((docs) =>{
        console.log(JSON.stringify(docs, undefined, 2));
    });




    // db.close();
})