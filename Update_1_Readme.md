Emoji Chat Automatic Word Conversion Update with
 react: ⚛️
  woah: 😲 
  hey: 👋 
  lol: 😂 
  like: ❤️ 
  congratulations: 🎉

 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- this functionlity in this app that when ever someone types these words in the text it will turn to  onlt if these words are used react : "⚛️"
woah : "😲"  
 hey  :  "👋"
 lol    : "😂"
like : "❤️"
congratulations: "🎉" then it will automatically display those words into emojis in chat app

--------------------------------------------------------------------------------------------------------------------------------------------------
We  can accomplish this functionality by replacing certain keywords with their corresponding emojis before sending or displaying the message in the chat. Here's how you can integrate this functionality into your app:

First, we will create a function replaceKeywordsWithEmojis that will handle the replacement of the specified words with emojis.

We will then use this function to transform the message content both when sending and when displaying a new message.

Let's implement these steps:

Create the replacement function:

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
        // Using the 'gi' flags to replace all occurrences regardless of their case
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        message = message.replace(regex, emojiMap[keyword]);
    }

    return message;
}

#Update the sendMessage function to replace keywords with emojis before emitting the message:

function sendMessage() {
    if (!username) {
        checkUsernameTimeout();
        return;
    }
    let message = document.getElementById('message').value;
    message = replaceKeywordsWithEmojis(message); // <-- Use the function here
    socket.emit('chat message', message, username);
    document.getElementById('message').value = '';

    clearTimeout(inactivityTimeout);

    inactivityTimeout = setTimeout(() => {
        document.getElementById('session-expired-modal').style.display = "block";
    }, 10000);
}
#Similarly, update the message display logic to replace any incoming keywords with emojis:

socket.on('chat message', (msg, user) => {
    msg = replaceKeywordsWithEmojis(msg); // <-- Use the function here
    const li = document.createElement('li');
    li.innerText = `${user}: ${msg}`;
    document.getElementById('messages').appendChild(li);
});
With these changes, whenever a user sends or receives a message containing the specified keywords, they will be automatically replaced with the corresponding emojis.