const {User} = require("./../models/user");



//this is our middleware that help use to check the user token and get is data from the db any time signin
const authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    //this find the user that is loginig in token so that it can render its data to him
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next(); //this make the (req, res) code to run any where this func is called
    }).catch((e) => {
        res.status(401).send(); //we did not call next here because the token was not found
    });
};

module.exports = {authenticate};