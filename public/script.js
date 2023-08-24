const socket = io();
let username;
let inactivityTimeout;

function replaceKeywordsWithEmojis(message) {
    const emojiMap = {
        "react": "⚛️",
        "woah": "😲",
        "hey": "👋",
        "lol": "😂",
        "like": "❤️",
        "congratulations": "🎉"
    };

    for (let keyword in emojiMap) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        message = message.replace(regex, emojiMap[keyword]);
    }

    return message;
}

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
    let message = document.getElementById('message').value;
    message = replaceKeywordsWithEmojis(message);
    socket.emit('chat message', message, username);
    document.getElementById('message').value = '';

    clearTimeout(inactivityTimeout);

    inactivityTimeout = setTimeout(() => {
        document.getElementById('session-expired-modal').style.display = "block";
    }, 10000);
}

socket.on('chat message', (msg, user) => {
    msg = replaceKeywordsWithEmojis(msg);
    const li = document.createElement('li');
    li.innerText = `${user}: ${msg}`;
    document.getElementById('messages').appendChild(li);
});

function checkUsernameTimeout() {
    if (!username) {
        document.getElementById('session-expired-modal').style.display = "block";
    }
}

function closeModal() {
    document.getElementById('session-expired-modal').style.display = "none";
    username = null;
    document.getElementById('chat-section').style.display = "none";
    document.getElementById('username-section').style.display = "block";
}
