const router = require('express').Router();
let User = require('../models/user.model');

//Gets a List of all users.
router.route('/getUsers').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Adds a user to the database.
router.route('/add').post((req, res) => {
    const username = req.body.username; // expected format {"username": "name"}

    const newUser = new User({username}); // User schema
    //Save the user to the db specified in the .env
    newUser.save()
        .then(() => res.json(`User ${username} added!`))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;