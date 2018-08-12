var express = require('express');
var router = express.Router();
var debug = require('debug')('simple-post:route:user');
var model = require('../models/index');
var postController = require('../controllers/post');
var userController = require('../controllers/user');

/* 1. create user. */
router.post('/', function(req, res, next) {
  var name  = req.body.name || "";
  
  if(name) {
    userController.create( name )
      .then(user => {
        debug("user: %s", JSON.stringify( user ));
        res.status(201).json( user );
      })
      .catch(error => {
        if( error.code ) {
          res.status( error.code ).json({
            error: error
          });
        } else {
          res.status(400).json({
            error: error
          });
        }
      });
  } else {
    res.status(400).json({
      error: {
        code: 400,
        message: "User name is not provided"
      }
    });
  }
});

/* 2. create user posts. */
router.post('/:userId/posts', function(req, res, next) {
  var userId  = req.params.userId || "";
  var subject = req.body.subject || "";
  var article = req.body.article || "";

  userController.createPost( userId, req.body )
    .then( post => {
      debug("post: %s", JSON.stringify( post ));
      res.status(201).json( post );
    })
    .catch( error => {
      debug("error: %s", JSON.stringify( error ));
      if( error.code ) {
        res.status( error.code ).json({
          error: error
        });
      } else {
        res.status(400).json({
          error: error
        });
      }
    });
});

/* 4. list user posts. */
router.get('/:userId/posts', function(req, res, next) {
  var id = req.params.userId;

  userController.readUserById(id)
    .then( user => {
      if( user ) {
        debug("Find the author [%s]", JSON.stringify( user ));
        return user.getPosts();
      } else {
          throw {
            code: 404,
            message: "Not Found"
          };
      }
    })
    .then( posts => {
      res.status(200).json( posts )
    })
    .catch( error => {
      if( error.code ) {
        res.status( error.code ).json({
          error: error
        });
      } else {
        res.status(400).json({
          error: error
        });
      }
    });
});

module.exports = router;
