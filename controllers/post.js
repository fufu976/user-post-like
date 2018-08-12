var model = require('../models/index');
var debug = require('debug')('simple-post:controller:post');

//Promise
function createLike( postId ){
  return new Promise(function(resolved, rejected){
    model.Posts.findById(postId)
      .then(post => {
        if( post ) {
          debug("Find the post [%s]", JSON.stringify( post ));
          return post.createLike();
        } else {
          throw {
            code: 404,
            message: "Not Found"
          };
        }
      })
      .then(like => {
        resolved( like );
      })
      .catch(error => {
        rejected( error );
      });
  });
}

//Async function
async function readPostById( id ){
  try {
    debug("find post By id = %d", id);
    const post = await model.Posts.findById( id );
    return post;
  } catch( error ) {
    debug(error);
    throw error;
  }
}

exports.createLike = createLike;
exports.readPostById = readPostById;