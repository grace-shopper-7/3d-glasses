/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');

// const { requireUser } = require('./utils');

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users.");

    next();
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) =>{
  const {username, password} = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      response.status (401);
      next ({
        name: "userExistError",
        message: `User ${username} is already taken.`,
      });   
    }else if (password.length < 8) {
      response.status (401);
      next ({
        name: "userExistError",
        message: `Password is too short.`,
      });   
    }else {
      const user = await createUser({username, password});

      if (!user) {
        next({name: "UserCreationError", message: "There is a problem with registration"})
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

// GET  /api/users/me * REQUIRES LOGIN

// GET  /api/users/:username/orderhistory * REQUIRES LOGIN

// PATCH /api/users/:userId * REQUIRES LOGIN

// DELETE /api/users/:userId * REQUIRES LOGIN

// Further Routes go here!

usersRouter.use((req, res, next) => {
    console.log("Now leaving /users.");

    next();
});

module.exports = usersRouter;
