const { ObjectID } = require('mongodb'); //this take all the id of datas in the db

const { mangoose } = require('./../server/db/mongoose');
const { Todo } = require("./../server/models/todo"); //this is used to get the Todos data from the database
const { User } = require("./../server/models/user");


// Todo.remove({}).then((result) => { //this removes all the todos from our database 
//     console.log(result)
// });

// Todo.findByIdAndRemove('5ad5d5d60407182f499b8ab3').then((todo) => { //this is used to delete document with id
//  console.log(todo); //this returns/print to the screen the document we are removing
// })

Todo.findOneAndRemove({ _id: "5ad5d5d60407182f499b8ab3"}).then((todo) => {
console.log(todo);
});