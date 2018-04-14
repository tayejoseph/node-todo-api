const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //this tells mongoose that u want to use any promise
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports = {
    mongoose
};