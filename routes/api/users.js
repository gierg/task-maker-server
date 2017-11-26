const express = require('express');
const router = express.Router();
const users = require('../../controllers/api/users');

/**
 * @api {get} /users List all users
 * @apiGroup Users
 * @apiSuccess {Object[]} users User's list
 * @apiSuccess {Number} users.id User id
 * @apiSuccess {String} users.description User description
 * @apiSuccess {Boolean} users.done User is done?
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "title": "Study",
 *      "done": false
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', users.getUsers);

/**
 * @api {post} /users Register a new task
 * @apiGroup Users
 * @apiParam {String} title User title
 * @apiParamExample {json} Input
 *    {
 *      "title": "Study"
 *    }
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} title User title
 * @apiSuccess {Boolean} done=false User is done?
 * @apiSuccess {Date} updated_at Update date
 * @apiSuccess {Date} created_at Register date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Study",
 *      "done": false,
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', users.addUser);

/**
 * @api {get} /users/:id Find a task
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} title User title
 * @apiSuccess {Boolean} done User is done?
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Study",
 *      "done": false
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', users.readUser);

/**
 * @api {put} /users/:id Update a task
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiParam {String} title User title
 * @apiParam {Boolean} done User is done?
 * @apiParamExample {json} Input
 *    {
 *      "title": "Work",
 *      "done": true
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', users.updateUser);

/**
 * @api {delete} /users/:id Remove a task
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', users.removeUser);

module.exports = router;
