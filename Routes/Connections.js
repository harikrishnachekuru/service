const express = require('express');
const Connections = express.Router();
const cors = require("cors")

// Require Business model in our routes module
let useme = require('../app/models/profileDataSchema');
Connections.use(cors())
process.env.SECRET_KEY = 'secret'

Connections.post('/user/suggest', (req, res) => {
    useme.find({
        stream : req.body.stream,
        point_of_interest : req.body.point_of_interest,
        passion : req.body.passion,
        profession : req.body.profession,
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("No more suggestions")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = Connections;