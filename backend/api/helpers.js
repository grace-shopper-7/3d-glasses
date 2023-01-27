function requireUser(req, res, next) {
  if (!req.user) {
    console.log("requireUser has failed.");
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  } else {
    // console.log("requireUser successful, moving to next step.");
    next();
  }
}


// function requireAdmin(req, res, next) {
  //   if (!req.user) {
//     console.log("requireUser has failed.");
//     res.status(401);
//     next({
//       name: "MissingUserError",
//       message: "You must be logged in to perform this action"
//     });
//   } else {
  //     // console.log("requireUser successful, moving to next step.");
  //     next();
//   }
// }

// module.exports = {
//   requireUser
// }
  
module.exports = {
  requireUser
}