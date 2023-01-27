const express = require("express");
const {
  getRoutineActivityById,
  getRoutineById,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db");
const {
  UnauthorizedError,
  UnauthorizedUpdateError,
  UnauthorizedDeleteError,
} = require("../errors");
const validateToken = require("./helpers");
const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId
router.patch("/:routineActivityId", async (req, res, next) => {
  const routineActivityId = req.params.routineActivityId;
  try {
    const isValidToken = await validateToken(req);

    if (!isValidToken) {
      res.status(401);
      next({
        error: "UnauthorizedError",
        message: UnauthorizedError(),
        name: "UnauthorizedError",
      });
    }
    const _routineActivity = await getRoutineActivityById(routineActivityId);

    if (!_routineActivity) {
      next({
        error: "RoutineActivityNotFoundError",
        name: "RoutineActivityNotFoundError",
        message: `Routine activity ${routineActivityId} not found`,
      });
    }

    const _routine = await getRoutineById(_routineActivity.routineId);

    if (_routine.creatorId !== isValidToken.id) {
      res.status(403);
      next({
        error: "UnauthorizedUpdateError",
        message: UnauthorizedUpdateError(isValidToken.username, _routine.name),
        name: "UnauthorizedUpdateError",
      });
    }

    const RAObj = {
      id: routineActivityId,
      count: req.body.count,
      duration: req.body.duration,
    };
    const updatedRoutineActivity = await updateRoutineActivity(RAObj);
    res.send(updatedRoutineActivity);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/routine_activities/:routineActivityId
router.delete("/:routineActivityId", async (req, res, next) => {
  const routineActivityId = req.params.routineActivityId;
  try {
    const isValidToken = await validateToken(req);

    if (!isValidToken) {
      res.status(401);
      next({
        error: "UnauthorizedError",
        message: UnauthorizedError(),
        name: "UnauthorizedError",
      });
    }
    const _routineActivity = await getRoutineActivityById(routineActivityId);

    if (!_routineActivity) {
      next({
        error: "RoutineActivityNotFoundError",
        name: "RoutineActivityNotFoundError",
        message: `Routine activity ${routineActivityId} not found`,
      });
    }

    const _routine = await getRoutineById(_routineActivity.routineId);

    if (_routine.creatorId !== isValidToken.id) {
      res.status(403);
      next({
        error: "UnauthorizedDeleteError",
        message: UnauthorizedDeleteError(isValidToken.username, _routine.name),
        name: "UnauthorizedDeleteError",
      });
    }

    const deletedRoutineActivity = await destroyRoutineActivity(
      routineActivityId
    );
    deletedRoutineActivity.success = true;
    res.send(deletedRoutineActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;