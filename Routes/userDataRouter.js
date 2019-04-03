const express = require('express');
const userRoutes = express.Router();
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require('../handlers/cloudinary')
const upload = require('../handlers/multer')
const cloudinary = require("cloudinary")

// Require Business model in our routes module
let useme = require('../app/models/profileDataSchema');
userRoutes.use(cors())

process.env.SECRET_KEY = 'secret'

// Defined store route
userRoutes.route('/user/add/:id').post(function (req, res) {
    let user = new useme(req.body);
    useme.findById(req.params.id, function(err, user) {
      if (!user)
        res.status(404).send("data is not found");
      else {
        user.first_name = req.body.first_name,
        user.last_name = req.body.last_name,
        user.phone_number = req.body.phone_number,
        user.passion = req.body.passion,
        user.profession = req.body.profession,
        user.location = req.body.location,
        user.overview = req.body.overview,
        user.stream = req.body.stream,
        user.point_of_interest = req.body.point_of_interest
  
          user.save().then(post => {
            res.json('user details added successfully');
        })
        .catch(err => {
              res.status(400).send("unable to save to database");
        });
      }
    });
  });

  userRoutes.route('/user/addimage/:id').post(upload.single('selectedFile'),function (req, res) {
    
    useme.findById(req.params.id, async function(err, user) {
      if (!user)
        res.status(404).send("data is not found");
      else {
        const result= await cloudinary.v2.uploader.upload(req.file.path);
        user.imageUrl = result.secure_url;
        await  user.save()
        res.json(result);
      }
    });
    //process.on('unhandledRejection', up => { throw up })
  });


//registering user
userRoutes.post('/user/register', (req, res) => {
    const today = new Date()
    const userData = {
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    useme.find({
        user_name: req.body.user_name,
        email: req.body.email
    })
        .then(user => {
            if (user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    useme.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' registered!' }),
                            console.log({ status: user.email + ' registered!' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' });
                console.log('User already exists' )
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

userRoutes.post('/user/login', (req, res) => {
    useme.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        user_name: user.user_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ errorPassword: "User password is wrong" })
                }
            } else {
                res.json({ errorUser: "User does not exist" })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

userRoutes.get('/user/profile/:id', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    useme.findById({
        _id: req.params.id
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})
// Defined get data(index or listing) route
userRoutes.route('/user').get(function (req, res) {
    useme.find(function(err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

//  Defined update route
userRoutes.route('/user/update/:id').post(function (req, res) {
  let users = new useme(req.body);
  useme.findById(req.params.id, function(err, users) {
    if (!users)
      res.status(404).send("data is not found");
    else {
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        phone_number = req.body.phone_number,
        passion = req.body.passion,
        profession = req.body.profession,
        location = req.body.location,
        email =  req.body.email,
        overview = req.body.overview,
        stream = req.body.stream,
        point_of_interest = req.body.point_of_interest

        users.save().then(users => {
            res.json('Update complete');
        })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route('/user/delete/:id').get(function (req, res) {
    useme.findByIdAndRemove(req.params.id, function(err, post){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });    
});

userRoutes.post('/user/chpass/:name', (req, res) => {
    useme.findOne({
        user_name: req.params.name,
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    bcrypt.hash(req.body.new_password, 10, (err, hash) => {
                    user.password = hash
                    user.save()
                        .then(user => {
                            res.json({ status: 'Password chaned successfully ' }),
                            console.log({ status: 'Password chaned successfully ' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            }
            } else {
                res.json({ error: 'User doesnot exists' });
                console.log('User doesnot exists' )
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = userRoutes;