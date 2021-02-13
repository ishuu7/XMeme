<h1 align="center">
🌐 XMeme
</h1>
<h2 align ="center">Post and enjoy MEMES</h2>

<p align="center">
   <!-- <a href="https://travis-ci.com/amazingandyyy/mern">
      <img src="https://travis-ci.com/amazingandyyy/mern.svg?branch=master" />
   </a> -->
   <a href="https://github.com/amazingandyyy/mern/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-green.svg" />
   </a>
   <!-- <a href="https://circleci.com/gh/amazingandyyy/mern">
      <img src="https://circleci.com/gh/amazingandyyy/mern.svg?style=svg" />
   </a> -->
</p>

> XMeme is a platform where people can post the memes and see the memes posted by other users, It isfullstack implementation in MongoDB, ExpressJS, ReactJS, NodeJS(MERN).

The project is the part of Crio Winter's of doing stage 2B.

## clone the app
```terminal
$ git clone https://gitlab.crio.do/COHORT_ME_BUILDOUT_XMEME_ENROLL_1612436694845/narendramanglani04-me_buildout_xmeme.git
```

## project structure
```terminal
LICENSE
readme.md
install.sh
server_run.sh
backend/
    controllers/
    models/
    routes/
    app.js
    db.js
    .gitignore
    package.json
    swagger.json
    .env (to create .env, check [prepare your secret session])
frontend/
    public/
    src/
    .gitignore
    package.json
    README.md
...
```

# Usage (run app on your machine)

## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^14.15.4 or above
- [npm](https://nodejs.org/en/download/package-manager/)

or You can just execute following in terminal to install MongoDB, Node, npm locally for ubuntu, It will also enable mongoDB database locally:
```terminal
$ cd narendramanglani04-me_buildout_xmeme // navigate to the clone directory.

$ chmod +x install.sh // make install.sh as an executable file.

$ ./install.sh // execute the install.sh file

...
```

__NOTICE__ : You need frontend and backend to run concurrently in different terminal session, in order to make them talk to each other


So make two terminals now, __Terminal - 1__ for backend and __Terminal - 2__ for frontend.

## Server - side usage (PORT: 8081) *Terminal - 1*
```terminal
$ cd backend // navigate to the backend folder from the cloned directory.
```

### Prepare your secret
In order to connect your backend with the local mongoDB server you've to make .env file and define and initialise the variable DB_CONN as the string which will connect the backend with the mongoDB locally.

Run the following in the terminal now,


```terminal
$ echo "DB_CONN='<URI for the local mongoDB server>'" >> .env
```

Example:
```terminal
$ echo "DB_CONN='mongodb://localhost:27017'" >> .env
```

### Start

```terminal
$ npm i       // npm install pacakges
$ npm start // start the backend server.
```

## Client - side usage (PORT: 3000) _Terminal - 2_
```terminal
$ cd frontend  // go to frontend folder from the cloned directory
```
### Prepare your secret
In order to connect your frontend with the backend you've to define the source of the backend in the .env as we mentioned the mongoDB address in the backend to connect mongoDB with the backend, So to connect the frontend to the backend, we need to initialise variable REACT_APP_BACKEND_URL as the 'http://localhost:8081'.

This application has the feature of deleting the post as well, So if you want to delete any post from the frontend you have to enter the password for the same, so you also need to initialise variable REACT_APP_PAS as your password.

#### Example:
```terminal
$ echo "REACT_APP_BACKEND_URL='http://localhost:8081'" >> .env

$ echo "REACT_APP_PAS='<your password>'" >> .env
```


### Start
```
$ npm i       // npm install pacakges

$ npm start // run the frontend locally
```

# Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
@material-ui/core: ^4.11.3 | cors: ^2.8.5
@material-ui/icons: ^4.11.2|dotenv: ^8.2.0
@material-ui/lab: ^4.0.0-alpha.57 | express: ^4.17.1
@testing-library/jest-dom: ^5.11.9 | mongoose": ^5.11.15
@testing-library/react: ^11.2.5 | nodemon: ^2.0.7
@testing-library/user-event: ^12.6.3 | swagger-ui-express: ^4.1.6
axios: ^0.21.1 | uuid": "^8.3.2
dotenv: ^8.2.0 | 
formik: ^2.2.6 | 
react: ^17.0.1 | 
react-dom: ^17.0.1 | 
react-scripts: 4.0.2 |
web-vitals: ^1.1.0
yup: ^0.32.8

<br />

# Screenshots of this project

User visiting the Home Page
![User visiting the Home Page](https://imgur.com/WZz9BJv.png)
![User visiting the Home Page](https://imgur.com/g2x0PLi.png)

User can Post the Meme by filling the form
![User can Post the Meme by filling the form](https://imgur.com/FzFY8Qa.png)

Meme is now posted below
![Meme is now posted below](https://imgur.com/WPZUjTc.png)

User can edit the Meme by clicking edit and change the url, caption or both.
![User editing the Meme](https://imgur.com/Lw8UTr8.png)

Admin can delete any meme by entering the password.
![admin deleting the meme](https://i.imgur.com/My3JB7h.png)


## Contact Me: 
narendramanglani04@gmail.com 


### License
[MIT](https://github.com/amazingandyyy/mern/blob/master/LICENSE)