const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get('groupId');


async function fetchMessages(groupId) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/find/messages/${groupId}`, {
            headers: { 'Authorization': token }
        });

        const messageList = document.getElementById('messageList');
        messageList.innerHTML = '';  // Clear previous messages
        response.data.forEach(message => {
            const messageItem = document.createElement('li');
            messageItem.innerHTML = `<strong>${message.userName}:</strong> ${message.content}`;
            messageList.appendChild(messageItem);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        alert('Failed to fetch messages');
    }
}


fetchMessages(groupId);

async function sendMessage() {
    try {
        const messageInput = document.getElementById('messageInput').value;
        if (!messageInput) return;

        const token = localStorage.getItem('token');
        const response = await axios.post('/group/addMessage', { content: messageInput , groupId: groupId }, {
            headers: { 'Authorization': token }
        });

        console.log(response.data);
        document.getElementById('messageInput').value = ''; // Clear input field after sending message
       // fetchMessages(); // Fetch updated message list
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message');
    }
}

const sendMessageBtn = document.getElementById('sendMessageBtn');
    sendMessageBtn.addEventListener('click', sendMessage);