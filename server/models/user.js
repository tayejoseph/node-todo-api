const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({ //this is used to declare the formate of our userdb
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
    tokens: [{ //this token is used to log out the user
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

UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject() //this take in our mongoose user varible and connert it to a regular object so that we can access it props

    return _.pick(userObject, ['_id', 'email']); //this are this we want to pick from the user object
};

UserSchema.methods.generateAuthToken = function () { //we are using es5 fun because we want to use "this"
const user = this;
const access = 'auth';
//the process.env.JWT_SECRET is gotten from the config.json file it is used to make our app more secured
const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

user.tokens.push({access, token});
return user.save().then(() => {
    return token;
});
};

UserSchema.methods.removeToken = function(token) {
const user = this;
return user.update({ //this used to remove a token from the user
    $pull : {
        tokens : { token }//this is pulling any token that is equal to the user token
    }
})
};

UserSchema.statics.findByToken = function(token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {//thuis runs if the user token is not found
        return Promise.reject()
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

//this is a method that will be used to check if the username of the user logining in is is the database then it compare the password with the sorted hashed password in the database
UserSchema.statics.findByCredentials = function(email, password){
const User = this;
return User.findOne({email}).then((user) =>{
    if(!user){//this runs if this user email does not exist in the database
        return Promise.reject(); //note promise is used here because the func is asych
    }
    //since the user email exist in our database now we want to compare the userpassword
    //with the our sorted hashed password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
            if(res){ //note the res value always return true if the password matched the sorted hashed password in the database
                resolve(user); //this send back the user data 
            } else { //this runs if the hashed password did not match
                reject();
            }
        });
    });
});
};


//this code is used to hashed the user password before it is being save to the database here we are using mongoose middleware
UserSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password')) {
        //the code below is used to hash our password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash; //this now set the user.password property in our db to be our hashed value
            next(); //this is being call to complete this middleware so that the user can login
            })
        })
    } else {
        next();
    }
});

const User = mongoose.model("User", UserSchema);

// const user1 = new User({
//     email: "adadsfa"
// });

// user1.save().then((result) => {
//     console.log(JSON.stringify(result, undefined, 2));
// }, (err) => {
//     console.log(err)
// });

module.exports = {User};