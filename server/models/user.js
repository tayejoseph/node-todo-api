const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const _ = require('lodash');


const UserSchma = new mongoose.Schema({ //this is used to declare the formate of our userdb
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true, //this make someone to have only one email account in the app
        validate: {
            validator: validator.isEmail, //this used to validate the email using the npm validator library
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchma.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject() //this take in our mongoose user varible and connert it to a regular object so that we can access it props

    return _.pick(userObject, ['_id', 'email']); //this are this we want to pick from the user object
};

UserSchma.methods.generateAuthToken = function () { //we are using es5 fun because we want to use "this"
const user = this;
const access = 'auth';
const token = jwt.sign({_id: user._id.toHexString(), access}, "abc123").toString();

user.tokens.push({access, token});
return user.save().then(() => {
    return token;
});
};

const User = mongoose.model("User", UserSchma);

const user1 = new User({
    email: "adadsfa"
});

// user1.save().then((result) => {
//     console.log(JSON.stringify(result, undefined, 2));
// }, (err) => {
//     console.log(err)
// });

module.exports = {User};