
const express = require('express');
const projectRoutes = express.Router();

// Require Business model in our routes module
let projectme = require('../app/models/projectSchema');

// Defined store route
projectRoutes.route('/project/add').post(function (req, res) {
  let project = new projectme(req.body);
  project.save()
    .then(business => {
      res.status(200).json({'post': 'project is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
projectRoutes.route('/project/get').get(function (req, res) {
    projectme.find({},null,{sort:{date: -1}},  function(err, projects){
    if(err){
      console.log(err);
    }
    else {
      res.json(projects);
    }
  });
});

projectRoutes.route('/project/:name').get(function (req, res) {
  let username = req.params.name;
  console.log(req.params.name)
  projectme.find({
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
projectRoutes.route('/project/edit/:id').get(function (req, res) {
  let id = req.params.id;
  projectme.findById(id, function (err, project){
      res.json(project);
  });
});

//  Defined update route
projectRoutes.route('/project/update/:id').post(function (req, res) {
  let project = new projectme(req.body);
  projectme.findById(req.params.id, function(err, project) {
    if (!project)
      res.status(404).send("data is not found");
    else {
        project.title = req.body.title;
        project.description = req.body.description;

        project.save().then(project => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
projectRoutes.route('/project/delete/:id').get(function (req, res) {
    projectme.findByIdAndRemove(req.params.id, function(err, project){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = projectRoutes;