const { crudService } = require("../services");
const path = require("path");
const fs = require("fs");
const uploadImage = require("../middlewares/cloudinary");

// ADD task

// http://localhost:3001/v1/crud/add
const addTask = async (req, res) => {
  try {
    const file = req.file;
    let image = await uploadImage(req.file.path);
    console.log(image, "image");

    const body = {
      imageName: image.secure_url,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    console.log(body, "task");
    const task = await crudService.addTask(body);

    if (!task) {
      throw new Error("Something went wrong");
    }

    res.status(201).json({
      message: "task Created success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET task

// http://localhost:3001/v1/crud/get

const getTask = async (req, res) => {
  const task = await crudService.getTask();
  console.log(task, "task get");

  res.status(200).json({
    message: "task get success",
    data: task,
  });
};

// UPDATE task

// http://localhost:3001/v1/crud/update/:<`id`>
const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(id, body);
    const task = await crudService.updateTask(id, body);
    res.status(200).json({
      message: "task updated success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// http://localhost:3001/v1/crud/delete/:<`id`>
// DELETE task
const deleteTask = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;

    const task = await crudService.deleteTask(id);
    if (!task) {
      throw new Error("something went wrong");
    }
    res.status(200).json({
      message: "task delete success",
      data: task,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// http://localhost:3001/v1/crud/search?name=<`name`>
const SearchUser = async (req, res) => {
  try {
    const { name, email, phone } = req.query;

    if (!name && !email && !phone) {
      return res.status(400).json({
        message: "At least one search parameter is required",
      });
    }
    let query = {};
    if (name) {
      query.name = name;
    }
    if (email) {
      query.email = email;
    }
    if (phone) {
      query.phone = phone;
    }

    const user = await crudService.SearchUser(query);

    if (user.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json({
      success: true,
      message: "User Data searching successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// search using http://localhost:3001/v1/crud/userList?page=1

const pagination = async (req, res) => {
  try {
    const page = req.query.page;
    const size = 5;
    const pages = parseInt(page);

    const Index = (pages - 1) * size;

    if (page < 1) {
      return res
        .status(400)
        .json({ message: "Page number must be greater than or equal to 1" });
    }

    const item = await crudService.pagination(Index, size);

    res.status(200).json({
      success: true,
      message: "User Data Pagination successfully!",
      data: item,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTask,
  addTask,

  updateTask,
  deleteTask,

  SearchUser,
  pagination,
};
