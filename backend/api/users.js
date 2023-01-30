/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const { getUserByUsername, createUser } = require("../db/users");
const { requireUser } = require('./helpers');

// const { requireUser } = require('./utils');

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users.");

    next();
});

usersRouter.get('/test', async (req, res, next) => {
  res.send("<p>Hello world</p>");
})

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) =>{
  const {
    username, 
    password,
    firstName,
    lastName,
    address,
    telephone,
    email
  } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status (401);
      next ({
        name: "userExistError",
        message: `User ${username} is already taken.`,
      });   
    }else if (password.length < 8) {
      res.status (401);
      next ({
        name: "passwordLengthError",
        message: `Password is too short.`,
      });   
    }else {
      const user = await createUser({
        username, 
        password,
        firstName,
        lastName,
        address,
        telephone,
        email
      });

      if (!user) {
        next({name: "UserCreationError", message: "There was a problem with registration"})
      } else{
        const token = jwt.sign({
          id: user.id,
          username
      }, process.env.JWT_SECRET, {
          expiresIn: '1w'
      });

      res.send({
          message: "Thank you for signing up!",
          token,
          user
      });
      }
    }
    
  } catch ({name, message}) {
    next({name, message})
  }
})

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const {username, password} = req.body;

  console.log(username, password);

  // If no username or password provided, throw an error
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await getUserByUsername(username);
    console.log(user);
    const hashedPassword = user.password;
    let passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (user && passwordsMatch) {
      // create a token & return to user
      const token = jwt.sign({id: user.id, username}, process.env.JWT_SECRET, {expiresIn: '1w'});
      res.send({ message: "You are now logged in!", token, user});
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect."
      });
    }
  } catch ({name, message}) {
    next({name, message});
  }
})

// GET  /api/users/me * REQUIRES LOGIN
usersRouter.get('/me', requireUser, async (req, res, next) => {
  const {username} = req.body;

  try {
    const user = await getUserByUsername(username);
    res.send(req.user);
  } catch ({name, message}) {
    next({name, message});
  }
})

// GET  /api/users/:username/orderhistory * REQUIRES LOGIN

// PATCH /api/users/:userId * REQUIRES LOGIN

// DELETE /api/users/:userId * REQUIRES LOGIN

// Further Routes go here!

usersRouter.use((req, res, next) => {
    console.log("Now leaving /users.");

    next();
});

module.exports = usersRouter;
