const env = process.env.NODE_ENV || "development"; //note heroku uses production env 

if (env === "development") { //this is used to create a database for use in develpment mode
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'; //this is our development database
} else if (env === "test") { //this creates a test case database for us
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'; //this is another database for running tests
}