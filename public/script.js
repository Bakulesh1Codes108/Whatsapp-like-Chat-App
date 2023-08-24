const socket = io();
let username;
let inactivityTimeout;

function checkUsername() {
    if (!username) {
        username = prompt("Please enter your username before typing a message:");
        if (username) {
            document.getElementById('current-user').innerText = username;
        } else {
            document.getElementById('message').blur();
        }
    }
}

function setUsername() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('current-user').innerText = username;
        document.getElementById('username-section').style.display = "none";
        document.getElementById('chat-section').style.display = "block";
    }
}

function sendMessage() {
    if (!username) {
        checkUsernameTimeout();
        return;
    }
    const message = document.getElementById('message').value;
    socket.emit('chat message', message, username);
    document.getElementById('message').value = '';

    clearTimeout(inactivityTimeout);

    inactivityTimeout = setTimeout(() => {
        document.getElementById('session-expired-modal').style.display = "block";
    }, 10000);
}

socket.on('chat message', (msg, user) => {
    const li = document.createElement('li');
    li.innerText = `${user}: ${msg}`;
    document.getElementById('messages').appendChild(li);
});

function checkUsernameTimeout() {
    if (!username) {
        document.getElementById('session-expired-modal').style.display = "block";
    }
}
function setUsername() {
  username = document.getElementById('username').value;
  if (username) {
      document.getElementById('current-user').innerText = username;
      document.getElementById('username-section').style.display = "none";
      document.getElementById('chat-section').style.display = "block";

      // Save the username to local storage
      localStorage.setItem('savedUsername', username);
  }
}

function closeModal() {
    document.getElementById('session-expired-modal').style.display = "none";
    username = null;
    document.getElementById('chat-section').style.display = "none";
    document.getElementById('username-section').style.display = "block";
}
