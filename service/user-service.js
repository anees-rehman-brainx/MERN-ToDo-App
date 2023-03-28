const userModal = require('../modals/user-modal');


// check if email exists
const validateEmail = async (email) => {
    const user = await userModal.find({"email" : email});
    return user.length == 0 ? false : true;
}


// check if userId exists
const validateUserId =async (userId) => {
    const existedUser = await userModal.find({_id : userId});
    return existedUser ? true : false;
}


// add user to the list
const addUser = async ({username, email, password}) => {
    const user = new userModal({username, email, password});
    return user.save();
}


// get all users
const getAllUsers =async () => {
    const users = await userModal.find();
    return users;
}


// get user by ID
const getUserById = (id) => {
    const existedUser = users.find(user => user.userId === id);
    return existedUser ? existedUser : false;
}


// get user by email
const getUserByEmail = async (email) => {
    return userModal.find({email : email});
}


// change username
const updateUsername = (userId, username) => {
    const index = users.findIndex(user => user.userId === userId);

    if(index != -1){
        users[index].username = username;
    }
}


// change password
const updatePassword = (userId, newPassword) => {
    const index = users.findIndex(user => user.userId === userId );
    if(index != -1){
        users[index].password = newPassword;
    }
}


module.exports = {
    validateEmail,
    validateUserId,
    addUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUsername,
    updatePassword
}