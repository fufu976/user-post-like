var model = require('../models/index');
var debug = require('debug')('simple-post:controller:post');

//Promise
function create( name ){
  return new Promise(function(resolved, rejected){
    model.Users.create({
        name: name
      })
      .then(user => {
        debug("user created [%s]", JSON.stringify( user ));
        resolved( user );
      })
      .catch(error => {
        rejected(error);
      });
  });
}

//Promise
function createPost( userId, post_content ){
  return new Promise(function(resolved, rejected){
    model.Users.findById( userId )
      .then(user => {
        if( user ) {
          debug("User found [%s]", JSON.stringify( user ));
          return user.createPost( post_content );
        } else {
          throw {
            code: 404,
            message: "Not Found"
          };
        }
      })
      .then(user => {
        resolved( user );
      })
      .catch(error => {
        rejected( error );
      });
  });
}

//Async function
async function readUserById( id ){
  try {
    debug("find user By id = %d", id);
    const user = await model.Users.findById( id );
    return user;
  } catch( error ) {
    debug(error);
    throw error;
  }
}

exports.create = create;
exports.createPost = createPost;
exports.readUserById = readUserById;