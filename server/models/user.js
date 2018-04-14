const mongoose = require('mongoose');


const User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
})

const user1 = new User({
    email: "adadsfa"
});

// user1.save().then((result) => {
//     console.log(JSON.stringify(result, undefined, 2));
// }, (err) => {
//     console.log(err)
// });

module.exports = {User};