const User = require('../models/User');


async function createUser(username,hashedPassword,adress){

   
    const user= new User({
        username,
        hashedPassword,
        adress
    })

    await user.save();
    return user;
}

async function getUserByUsername(username) {
    return await User.findOne({ "username":`${username}` });
   
}

async function getUserById(id){
    return await User.findById(id).lean()
}


module.exports={
    createUser,
    getUserByUsername,
    getUserById
}