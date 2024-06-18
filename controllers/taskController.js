const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find()

    res.status(200).json({
        status: "success",
        data: {
            tasks
        }
    });

};

exports.getTask= async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if(!task) {
        return next(Error("Task not found with that ID!"));
    }

    res.status(200).json({
        status: "success",
        data: {
            task
        }
    });

};

exports.createTask = async (req, res) => {
        const taskData = {
            ...req.body,
            user: req.user.id
        };

        const task = await Task.create(taskData);

    res.status(201).json({
        status: "success",
        data: {
            tour: task,
        },
    });
};

exports.updateTask = async (req, res, next) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if(!task) {
        return next(new Error("Task not found with that ID"))
    }
    res.status(200).json({
        status: "success",
        data: {
            task,
        }
    })
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                status: "fail",
                message: "Task not found with that ID!"
            });
        }

        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        next(err);
    }
};
