const Task = require('../../models/task');
const _ = require('lodash');

const getTasks = function (req, res, next) {
  Task.find({}, null, { sort: { _id: -1 } }, (error, tasks) => {
    if(error) {
      return next(error);
    }
    return res.send(tasks);
  });
};

const addTask = function (req, res, next) {
  let newTask = new Task(_.pick(req.body, [
    'description',
    'isComplete',
    'isPriority',
    'dueDate',
    'userID'
  ]));

  newTask.save((error, task) => {
    if(error) {
      return next(error);
    }
    return res.status(201).send(task);
  });
};

const readTask = function (req, res, next) {
  const id = req.params.id;

  Task.findById(id, (error, task) => {
    if(error) {
      return next(error);
    }
    return res.send(task);
  });
};

const updateTask = function (req, res, next) {
  const id = req.params.id;

  Task.findById(id, (error, task) => {
    if(error) {
      return next(error);
    }

    Object.assign(task, _.pick(req.body, [
      'description',
      'isComplete',
      'isPriority',
      'dueDate',
      'userID'
    ]));

    return task.save((err, result) => {
      if(err) {
        return next(err);
      }
      return res.status(204).send(result);
    });
  });
};


const removeTask = function (req, res, next) {
  const id = req.params.id;

  Task.findById(id, (error, task) => {
    if(error) {
      return next(error);
    }

    return task.remove((err, result) => {
      if(err) {
        return next(err);
      }
      return res.status(204).send(result);
    });
  });
};

module.exports = {
  getTasks(req, res, next) {
    return getTasks(req, res, next);
  },
  addTask(req, res, next) {
    return addTask(req, res, next);
  },
  readTask(req, res, next) {
    return readTask(req, res, next);
  },
  updateTask(req, res, next) {
    return updateTask(req, res, next);
  },
  removeTask(req, res, next) {
    return removeTask(req, res, next);
  }
};
