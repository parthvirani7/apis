const { crudSchema } = require("../models");

const addTask = (body) => {
 
  return crudSchema.create(body);
  
};

const getTask = () => {
  return crudSchema.find();
};

const updateTask = (id, body) => {
  return crudSchema.findByIdAndUpdate(id, body);
};
const deleteTask = (id) => {
  return crudSchema.findByIdAndDelete(id);
};

const SearchUser = async (query) => {
  return crudSchema.find(query);
};

const pagination = async (Index, size) => {
  return crudSchema.find().skip(Index).limit(size);
};
module.exports = { addTask,getTask,updateTask,deleteTask,SearchUser,pagination};