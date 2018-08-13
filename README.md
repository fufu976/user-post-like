# Chocolabs Assignment - RESTful API
* Using Node.js, Express, Sequelize.js, and MySQL.

## Getting Started

* Follow the instructions below to run the app and test the RESTful API.

### Prerequisites

My development environment

* Ubuntu 16.04.5 LTS
* Node.js v8.11.3
* npm 6.3.0
* MySQL 5.7.23 on local machine

### Installing

#### 1. clone project repository

```
$ git clone https://github.com/fufu976/user-post-like.git
```

#### 2. npm installation

```
$ npm install
```

#### 3. sequelize migration

* Start migration after make sure MySQL has already been installed.
* If MySQL has been installed on the machine, modify the username and password in the config/config.json file.
* The sequelize-cli commands will load the config/config.json configurations to create the database.

#### 3-1. Create Database according to the config/config.json

```
$ node_modules/.bin/sequelize db:create
```
#### 3-2. Create all the tables defined in the migration directory

```
$ node_modules/.bin/sequelize db:migrate
```

### Lauch the API server

```
$ npm start
or
$ DEBUG=simple-post:* npm start
```

### Test the RESTful API

* Use Curl to test the RESTful API, here we use curl to test.
* You can also use [Postman](https://www.getpostman.com/apps) to test the RESTful API.

#### Table of the RESTful API
| Resources           | POST     | GET |
| :------------ |:---------------:| -----:|
| /users              | Create new user          | X |
| /users/:userId/posts| Create new post for user | List all posts of a user |
| /posts/:postId/likes| Create new like for post | List all likes of a post |

#### 1. Create new User

```
curl -d '{"name": "jeffchen"}' -X POST -H "Content-Type: application/json" http://localhost:3000/users/
```

The body paload

```
{
  name : [string]
}
```

Result of the request

```
{
  "id":2,
  "name":"jeffchen",
  "updatedAt":"2018-08-13T02:06:02.834Z",
  "createdAt":"2018-08-13T02:06:02.834Z"
}
```

#### 2. Create new Post for User

```
curl -d '{"subject":"題目", "article":"內容"}' -X POST -H "Content-Type: application/json" http://localhost:3000/users/2/posts
```

The body paload
```
{
  subject : [string],
  article : [string]
}
```

Result of the request

```
{
  "id":2,
  "subject":"題目",
  "article":"內容",
  "UserId":2,
  "updatedAt":"2018-08-13T02:15:52.339Z",
  "createdAt":"2018-08-13T02:15:52.339Z"
}
```

#### 3. Create new Like for Post

```
curl -X POST -H "Content-Type: application/json" http://localhost:3000/posts/2/likes
```

Result of the request

```
{
  "id":1,
  "PostId":2,
  "updatedAt":"2018-08-13T02:19:14.097Z",
  "createdAt":"2018-08-13T02:19:14.097Z"
}
```

#### 4. List all Posts of a User

```
curl http://localhost:3000/users/2/posts
```

Result of the request

```
[
  {
    "id":2,
    "subject":"題目",
    "article":"內容",
    "createdAt":"2018-08-13T02:15:52.000Z",
    "updatedAt":"2018-08-13T02:15:52.000Z",
    "UserId":2
  }
]
```

#### 5. List all Likes of a Post

```
curl http://localhost:3000/posts/2/likes
```

Result of the request

```
[
  {
    "id":1,
    "createdAt":"2018-08-13T02:19:14.000Z",
    "updatedAt":"2018-08-13T02:19:14.000Z",
    "PostId":2
  }
]
```


