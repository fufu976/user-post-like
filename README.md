# RESTful API app
* Using Node.js, Express, Sequelize.js, and MySQL.
* The following instructions are based on the assumption that you use the Ubuntu machine.

# Getting Started
### 1. clone project repository
```
$ git clone https://github.com/fufu976/user-post-like.git
```

### 2. npm installation
```
$ npm install
```

### 3. sequelize migration
* Make sure MySQL has already been installed before migration implementing.
* If MySQL has been installed on the machine, modify the username and password in the config/config.json file.

#### Create Database according to the config/config.json
```
$ node_modules/.bin/sequelize db:create
```
#### Start migration
```
$ node_modules/.bin/sequelize db:migrate
```

### 4. Lauch API server
```
$ npm start
or
$ DEBUG=simple-post:* npm start
```

### 5. RESTful API Usage
##### * HTTP method with URI
| Resources           | POST     | GET |
| :------------ |:---------------:| -----:|
| /users              | Create new user          | X |
| /users/:userId/posts| Create new post for user | List all posts for user |
| /posts/:postId/likes| Create new like for post | List all likes for post |

##### * The body paload for POST /users
```
{
  name : [string]
}
```
##### * The body paload for POST /users/:userId/posts
```
{
  subject : [string],
  article : [string]
}
```

