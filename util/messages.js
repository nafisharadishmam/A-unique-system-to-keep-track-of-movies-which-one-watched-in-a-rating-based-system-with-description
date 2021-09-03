const moment = require('moment');

function formatMessage(username,text,email){
    return{
        username,
        text,
        email,
        time:moment().format('h:mm a')
    }
}

module.exports = formatMessage;