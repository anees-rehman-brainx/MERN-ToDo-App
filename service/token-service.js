const tokenModel = require("../modals/token-modal");

// adding token in database 
const addToken = async(userId, JWTtoken) =>{
    const token = new tokenModel({token : JWTtoken, userId : userId});
    return token.save(); 
} 

// check token against user id
const getTokenByUserId = async (userId) => {
    const token = await tokenModel.find({userId : userId});
    return token ? token : null;
}

// get user id by token
const getUserByToken = async (token) => {
    const user = await tokenModel.find({token : token});
    return user ? user : null;
}

module.exports = {
    addToken,
    getTokenByUserId,
    getUserByToken
}