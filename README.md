# Covid Slayer Back End

## Installation
```bash
# clone the repo
$ git clone https://github.com/dbsolde/covid-slayer-api.git

# go into app directory
$ cd covid-slayer-api

# install app dependencies
$ npm i or yarn
```

## Basic usage

```bash
# Run api
$ npm run start

In your local you can access it
localhost:4000

and the prod URL
https://covid-slayer-api.herokuapp.com

Note: In production it will take time to load at first as the dyno still sleeping
secret key is not so secure, you may update it and add it to env variable for security purposes 
```

## Back End Available Pages
```bash
POST: Login (/user/login)
POST: Register (/user/register)
GET: Get user (/user/:userId)
POST: Save Game History (/game/createhistory)
GET: Game History with pagination (/game/histories/:page/:pageSize)
```

## Stack
```bash
Node JS
Express JS
mongodb
JWT for authentication
Used multer for file uploading
```

### Back End tasks summary
```bash
Integrate mongodb
Sign up endpoint and user can upload avatar
Login endpoint
jwt
Protected route
Save each game
View game hitories and implemented pagination
Created user details endpoint
```

```bash
# Back End outstanding tasks
token refresh
dockerized
unit test
```