// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb'); //this code is identical to the code up above but it access the MongoClient props, and the ObjectID for mangodb

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {//this connect our data to the database
    if (err) {
        return console.log("Unable to connect to MongoDB server")
    }
    console.log("connect to mongoDB server")
    
    //THIS IS USED TO DELEETE MANY DATA IN OUR DATABASE
    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // });

    //THIS DELETE ONLY ONE
    // db.collection('Todos').deleteOne({ text: "Eat launch" }).then((result) => {
    //     console.log(result);
    // });

    //FINDONEANDDELETE 
    // db.collection('Todos').findOneAndDelete({ completed: true }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: "Andrew"}).then((result) => {
    //     console.log(result)
    // });

    db.collection('Users').findOneAndDelete({ _id: new ObjectID("5ad1104665d12cdb73bfb4b4")}).then((result) => {
        console.log(result)
})

    // db.close(); //this is used to close the connection with the mongoDB server
}); 