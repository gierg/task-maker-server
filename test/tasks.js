const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const Task = require('../models/task');

describe('Task Model', () => {
  it('should create a new task', (done) => {
    const TaskMock = sinon.mock(new Task({ description: 'Task Description', isCompleted: true }));
    const task = TaskMock.object;

    TaskMock
      .expects('save')
      .yields(null);

    task.save((err) => {
      TaskMock.verify();
      TaskMock.restore();
      expect(err).to.be.null;
      done();
    });
  });

  it('should return error if task is not created', (done) => {
    const TaskMock = sinon.mock(new Task({ description: 'Task Description', isCompleted: true }));
    const task = TaskMock.object;
    const expectedError = {
      name: 'ValidationError'
    };

    TaskMock
      .expects('save')
      .yields(expectedError);

    task.save((err, result) => {
      TaskMock.verify();
      TaskMock.restore();
      expect(err.name).to.equal('ValidationError');
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should find task by id', (done) => {
    const taskMock = sinon.mock(Task);
    const expectedTask = {
      _id: '5700a128bd97c1341d8fb365',
      description: 'Task Description'
    };

    taskMock
      .expects('findOne')
      .withArgs({ _id: '5700a128bd97c1341d8fb365' })
      .yields(null, expectedTask);

    Task.findOne({ _id: '5700a128bd97c1341d8fb365' }, (err, result) => {
      taskMock.verify();
      taskMock.restore();
      expect(result._id).to.equal('5700a128bd97c1341d8fb365');
      done();
    });
  });

  it('should remove task by id', (done) => {
    const taskMock = sinon.mock(Task);
    const expectedResult = {
      nRemoved: 1
    };

    taskMock
      .expects('remove')
      .withArgs({ _id: '5700a128bd97c1341d8fb365' })
      .yields(null, expectedResult);

    Task.remove({ _id: '5700a128bd97c1341d8fb365' }, (err, result) => {
      taskMock.verify();
      taskMock.restore();
      expect(err).to.be.null;
      expect(result.nRemoved).to.equal(1);
      done();
    });
  });
});
