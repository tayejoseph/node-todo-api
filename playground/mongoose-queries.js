const {ObjectID} = require('mongodb'); //this take all the id of datas in the db

const {mangoose} = require('./../server/db/mongoose');
const {Todo} = require("./../server/models/todo"); //this is used to get the Todos data from the database
const {User} = require("./../server/models/user");

const id = "5ad1dc95757ced15cc5c299ba"; //note we call the id as a string

if(!ObjectID.isValid(id)) { //this is used to check if the id is valid with the one in the database
    console.log("ID not valid");
};
// Todo.find({
//     _id: id //this find our todo in our database
// }).then((todos) => {
//     console.log("Todos", todos);
// }); //this will return [] if the id was not found

// Todo.findOne({ //this find the first db data the past the test
//     _id: id //this find our todo in our database
// }).then((todos) => {
//     console.log("Todos", todos);
// })//this will return null if the id was not found
// //this find data in the db by just id


// Todo.findById(id).then((todos) => {
//     if(!todos) {
//         return console.log("Id not found!") //this runs is the id was valid but not found
//     }
//     console.log("Todos By Id", todos);
// }).catch((e) => console.log(e) //this runs is the id is invalid which is rturn what the isValid func
// above returns);//this will return null if the id was not found


//USER QUERIES
User.findById(id).then((user) => {
    if(!user) {
        return console.log("Id not found")
    }
    console.log("User by id", user)
}).catch((e) => console.log(e) );