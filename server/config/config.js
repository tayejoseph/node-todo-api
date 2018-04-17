const env = process.env.NODE_ENV || "development";

if (env === "development") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'; //this is our development database
} else if (env === "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'; //this is another database for running tests
}