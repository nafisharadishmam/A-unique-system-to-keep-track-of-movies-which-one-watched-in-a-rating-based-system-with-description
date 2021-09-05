const users = [];

//Join user to chat

function userJoin(id, username, email, room){
    const user = {id, username, email, room};
    users.push(user);

    return user;
}

// current user

function getCurrentUser(id){
    return users.find(user=> user.id === id);
}

// user leaves chat

function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1)
        return users[index];
}
module.exports = {
    userJoin,
     getCurrentUser,
     userLeave
};