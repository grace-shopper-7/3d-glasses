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
