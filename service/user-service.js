const userModal = require('../modals/user-modal');

// add user to the list
const addUser = async (user) => {
    const savedUser = await new userModal(user);
    return savedUser.save();
}

// get all users
const getAllUsers = async () => {
    const users = await userModal.find();
    return users;
}

// get user by ID
const getUserById = async (id) => {
    const user = await userModal.findById(id);
    return user; 
}

// get user by email
const getUserByEmail = async (email) => {
    const user = await userModal.findOne({email});
    return user;
}

// change user feild
const updateUser = async (cond, update, options) => {
   const updatedUser = await userModal.findByIdAndUpdate(cond, update, options);
   return updatedUser;
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
}