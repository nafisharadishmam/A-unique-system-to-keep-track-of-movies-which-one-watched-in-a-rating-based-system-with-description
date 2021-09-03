const users = [];

//Join user to chat

function userJoin(id, username, email, room){
    const user = {id, username, email, room};
    users.push(user);

    return user;
}

function getCurrentUser(id){
    return users.find(user=> user.id === id);
}

module.exports = {
    userJoin,
     getCurrentUser
};