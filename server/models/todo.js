const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true //this remove any leading or trailing whitespace
    },
    completed: {
        type: Boolean,
        default: false //this is the default value
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: { 
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    }
});

module.exports = {Todo};
//this is used to create a module on how our todo values shld look like

// const newTodo = new Todo({
//     text: "Cook dinner"
// }); 

// newTodo.save().then((doc) => {
// console.log('Saved todo', doc);
// }, (e) => {
//     console.log("Unable to save todo")
// }); //this save newTodo to the db

// const anotherTodo = new Todo({
//     text: "I want to be better than Elon Musk",
//     completed: true,
//     completedAt: 2000
// });

// anotherTodo.save().then((result) => {
// console.log(JSON.stringify(result, undefined, 2))}, (err) => {
//     console.log(err)
// })
