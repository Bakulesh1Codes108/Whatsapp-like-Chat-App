const socket = io('http://127.0.0.1:5000');
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
    const messageElem = document.getElementById('message');
    let message = messageElem.value;
    
    if (message.startsWith('/')) {
        processSlashCommand(message);
    } else {
        message = convertWordsToEmoji(message);
        socket.emit('chat message', message, username);
    }
    
    messageElem.value = '';
    clearTimeout(inactivityTimeout);

    inactivityTimeout = setTimeout(() => {
        document.getElementById('session-expired-modal').style.display = "block";
    }, 30000);
}

function convertWordsToEmoji(message) {
    const emojiMap = {
        'react': '⚛️',
        'woah': '😲',
        'hey': '👋',
        'lol': '😂',
        'like': '❤️',
        'congratulations': '🎉'
    };

    for (const word in emojiMap) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi'); // matches whole words
        message = message.replace(regex, emojiMap[word]);
    }

    return message;
}

function processSlashCommand(command) {
    switch (command) {
        case '/help':
            showHelpModal();
            break;
        case '/random':
            const randomNumber = (Math.random() * 1e12).toFixed(0);
            const randomMessage = `<i>Here's your Random number: ${randomNumber}</i>`;
            const li = document.createElement('li');
            li.innerHTML = randomMessage;
            document.getElementById('messages').appendChild(li);
            break;
        case '/clear':
            document.getElementById('messages').innerHTML = '';
            break;
        default:
            const errorMsg = 'Invalid command. Type /help for a list of available commands.';
            alert(errorMsg);
    }
}

function showHelpModal() {
    const helpModal = document.getElementById('help-modal');
    helpModal.style.display = "block";
}

function closeHelpModal() {
    const helpModal = document.getElementById('help-modal');
    helpModal.style.display = "none";
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

function closeModal() {
    document.getElementById('session-expired-modal').style.display = "none";
    username = null;
    document.getElementById('chat-section').style.display = "none";
    document.getElementById('username-section').style.display = "block";
}

socket.on('online users count', (count) => {
  document.getElementById('online-users-count').innerText = `Online Users: ${count}`;
});
