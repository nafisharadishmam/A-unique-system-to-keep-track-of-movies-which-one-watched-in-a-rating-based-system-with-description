const chatForm = document.getElementById('chatForm');
const chatMessages = document.querySelector('.body');

//Get username
const {
      username,
      email,
      room
} = Qs.parse(location.search, {
      ignoreQueryPrefix: true
});


const socket = io();

// join chat
socket.emit('joinRoom', {
      username,
      email
});


//Message from server

socket.on('message', message => {

      outputMessage(message);

      //scroll down for latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message send

chatForm.addEventListener('submit', e => {
      e.preventDefault();

      // Message text
      const msg = e.target.elements.msg.value;

      //Send message to server
      socket.emit('chatMessage', msg);

      //clear input
      e.target.elements.msg.value = "";
      e.target.elements.msg.focus();
});


//Output message to DOM
function outputMessage(message) {
      const div = document.createElement('div');
      if (message.username == username) {
            div.classList.add('send-message');
            div.innerHTML = `<div class="message-text d-flex">
      <div class="message">${message.text}</div>
      <div class="time">${message.time}</div>
      </div>`;
      } else if (message.username == "Movie Gossip room") {
            div.classList.add("system-msg", "text-center", "pt-2", "fw-bold");
            div.innerHTML = `<p>${message.text} <span class="fw-light" style="font-size:0.8rem; margin-left:10px">${message.time} </span></p>`;
      } else {
            div.classList.add('receive-message');
            div.innerHTML = `
            <div class="intro d-flex">
                <div class="name fw-bold">${message.username}</div>
                <div class="email">${message.email}</div>
            </div>
            <div class="message-text d-flex">
                <div class="message"><p>${message.text}</div>
                <div class="time">${message.time}</div>
            </div>
        `;

      }
      document.querySelector('.body').appendChild(div);
}

// group box show hide

$(document).ready(function () {

      $("#messenger-icon").click(function () {
            $("#container-mesngr").fadeToggle(1000);
      });
});