var express = require('express');
var router = express.Router();
var debug = require('debug')('simple-post:route:post');
var postController = require('../controllers/post');

/* 3. create post ike. */
router.post('/:postId/likes', function(req, res, next) {
  var postId  = req.params.postId || "";

  postController.createLike( postId )
    .then( like => {
      debug("like: %s", JSON.stringify( like ));
      res.status(201).json( like );
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

/* 5. list post likes. */
router.get('/:postId/likes', function(req, res, next) {
  var postId  = req.params.postId || "";

  postController.readPostById( postId )
    .then( post => {
      if( post ) {
        debug("Find the post [%s]", JSON.stringify( post ));
        return post.getLikes();
      } else {
        throw {
          code: 404,
          message: "Not Found"
        };
      }
    })
    .then( likes => {
      res.status(200).json( likes );
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
