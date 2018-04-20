const {SHA256} = require("crypto-js"); //this is used to get the dependency we are going to use for hashing
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//EXAMPLE ON HOW TO HASH PASS WORD
 const password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash)
//     })
// })

const hashedPassword ="$2a$10$JDbXKwPl4AxHFpqac7jzzurVmDbLHyXzf6sAvTGNDskyJCk6D0PA."
//this is used to compare our hashed password with the plane password because anytime a user type in a password the password is usually hashed
bcrypt.compare(password, hashedPassword, (err, res) => {
console.log(res) //this returns true because the hashed passworld is the same with the plain password if not it will return false
})




// const data = {
//     id: 10
// };

// const token = jwt.sign(data, "123abc");
// console.log(token);

// const decoded = jwt.verify(token, "123abc")
// console.log(decoded);

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