const {SHA256} = require("crypto-js"); //this is used to get the dependency we are going to use for hashing
const jwt = require('jsonwebtoken');


const data = {
    id: 10
};

const token = jwt.sign(data, "123abc");
console.log(token);

const decoded = jwt.verify(token, "123abc")
console.log(decoded);

// const message = "I am user number 3";
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//     id: 4
// };

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }


// const resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

// if(resultHash === token.hash){
//     console.log("Data was not changed");
// }else {
//     console.log("Data was change don't trust")
// }