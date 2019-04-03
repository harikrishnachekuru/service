
const express = require('express');
const postRoutes = express.Router();

// Require Business model in our routes module
let postme = require('../app/models/postSchema');

// Defined store route
postRoutes.route('/add').post(function (req, res) {
  let post = new postme(req.body);
  post.save()
    .then(business => {
      res.status(200).json({'post': 'post in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
postRoutes.route('/').get(function (req, res) {
    postme.find({},null,{sort:{date: -1}}, function(err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts);
    }
  });
});

postRoutes.route('/:name').get(function (req, res) {
  let username = req.params.name;
  console.log(req.params.name)
  postme.find({
    user_name: username
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
});

// Defined edit route
postRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  postme.findById(id, function (err, post){
      res.json(post);
  });
});

//  Defined update route
postRoutes.route('/update/:id').get
(function (req, res) {
  let post = new postme(req.body);
    postme.findById(req.params.id, function(err, post) {
    if (!post)
      res.status(404).send("data is not found");
    else {
        post.title = req.body.title;
        post.description = req.body.description;

        post.save().then(post => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
postRoutes.route('/delete/:id').get(function (req, res) {
    postme.findByIdAndRemove(req.params.id, function(err, post){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = postRoutes;