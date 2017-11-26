const User = require('../../models/user');
const _ = require('lodash');

const getUsers = function (req, res, next) {
  User.find({}, null, { sort: { _id: -1 } }, (error, users) => {
    if(error) {
      return next(error);
    }
    return res.send(users);
  });
};

const addUser = function (req, res, next) {
  let newUser = new User(_.pick(req.body, [
    'id',
    'username',
    'email',
    'password',
    'tokens',
    'name',
    'photo'
  ]));

  newUser.save((error, user) => {
    if(error) {
      return next(error);
    }
    return res.status(201).send(user);
  });
};

const readUser = function (req, res, next) {
  const id = req.params.id;

  User.findById(id, (error, user) => {
    if(error) {
      return next(error);
    }
    return res.send(user);
  });
};

const updateUser = function (req, res, next) {
  const id = req.params.id;

  User.findById(id, (error, user) => {
    if(error) {
      return next(error);
    }

    Object.assign(user, _.pick(req.body, [
      'email',
      'password',
      'tokens',
      'name',
      'photo'
    ]));

    return user.save((err, result) => {
      if(err) {
        return next(err);
      }
      return res.status(204).send(result);
    });
  });
};


const removeUser = function (req, res, next) {
  const id = req.params.id;

  User.findById(id, (error, user) => {
    if(error) {
      return next(error);
    }

    return user.remove((err, result) => {
      if(err) {
        return next(err);
      }
      return res.status(204).send(result);
    });
  });
};

module.exports = {
  getUsers(req, res, next) {
    return getUsers(req, res, next);
  },
  addUser(req, res, next) {
    return addUser(req, res, next);
  },
  readUser(req, res, next) {
    return readUser(req, res, next);
  },
  updateUser(req, res, next) {
    return updateUser(req, res, next);
  },
  removeUser(req, res, next) {
    return removeUser(req, res, next);
  }
};
