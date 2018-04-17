const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //this tells mongoose that u want to use any promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');// this check if we created a data base on heroku else of not it will use our local one


module.exports = {
    mongoose
};