const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get('groupId');
localStorage.setItem('groupId', groupId);

async function fetchMessages(groupId) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/find/messages/${groupId}`, {
            headers: { 'Authorization': token }
        });

        const messageList = document.getElementById('messages');
        messageList.innerHTML = '';  // Clear previous messages
        response.data.forEach(message => {
            const messageItem = document.createElement('li');
            messageItem.innerHTML = `<strong>${message.userName}:</strong> ${message.content}`;
            messageList.appendChild(messageItem);
        });

        // Join the group room for real-time updates
        socket.emit('joinGroup', groupId);

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
        const groupId = localStorage.getItem('groupId');  // Ensure you have the group ID

        await axios.post('/group/addMessage', { content: messageInput, groupId }, {
            headers: { 'Authorization': token }
        });

        document.getElementById('messageInput').value = ''; 

    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message');
    }
}

socket.on('message', (message) => {
    const messageList = document.getElementById('messages');
    const messageItem = document.createElement('li');
    messageItem.innerHTML = `<strong>${message.userName}:</strong> ${message.content}`;
    messageList.appendChild(messageItem);
});

const sendMessageBtn = document.getElementById('sendMessageBtn');
sendMessageBtn.addEventListener('click', sendMessage);

async function checkAdminStatus() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/isAdmin/${groupId}`, {
            headers: { 'Authorization': token }
        });
        console.log(response.data.isAdmin);
        if (response.data.isAdmin) {
            const adminButtonsDiv = document.getElementById('adminButtons');
            const userDetailsBtn = document.createElement('button');
            userDetailsBtn.textContent = 'User Details';
            userDetailsBtn.addEventListener('click', () => {
                members()
            });

            const manageRequestsBtn = document.createElement('button');
            manageRequestsBtn.textContent = 'Manage Requests';
            manageRequestsBtn.addEventListener('click', () => {
               
                manageRequests(groupId);
            });

            adminButtonsDiv.appendChild(userDetailsBtn);
            adminButtonsDiv.appendChild(manageRequestsBtn);
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
        alert('Failed to check admin status');
    }
}

checkAdminStatus();
async function members()
{
    const token = localStorage.getItem('token');
        const response = await axios.get(`/see/members/${groupId}`, {
            headers: { 'Authorization': token }
        });  

        
        const requestList = document.createElement('ul');
        requestList.id = 'requestList';
 response.data.forEach(userr=>{
    const requestItem = document.createElement('li');
     requestItem.innerHTML = 
        `<strong>${userr.userName}</strong>`;
    if(userr.isAdmin!==true){
        requestItem.innerHTML += 
        `
<button onclick="Makeadmin(${userr.userId}, ${groupId})">Makeadmin</button>
<button onclick="Remove(${userr.userId}, ${groupId})">Remove</button>
`;
    }
        requestList.appendChild(requestItem);
        })

const adminActions = document.getElementById('adminActions');
adminActions.innerHTML = ''; 
adminActions.appendChild(requestList);
}

async function Makeadmin(userId, groupId) {
    try {
        const token = localStorage.getItem('token');
        await axios.post('/see/admin', { userId, groupId }, {
            headers: { 'Authorization': token }
        });
        alert('Request accepted');
        manageRequests(groupId); // Refresh the list
    } catch (error) {
        console.error('Error accepting request:', error);
        alert('Failed to accept request');
    }
}

async function Remove(userId, groupId) {
    try {
        const token = localStorage.getItem('token');
        await axios.post('/see/remove', { userId, groupId }, {
            headers: { 'Authorization': token }
        });
        alert('Request accepted');
        manageRequests(groupId); // Refresh the list
    } catch (error) {
        console.error('Error accepting request:', error);
        alert('Failed to accept request');
    }
}



async function manageRequests(groupId) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/isAdmin/requests/${groupId}`, {
            headers: { 'Authorization': token }
        });

        const requestList = document.createElement('ul');
        requestList.id = 'requestList';

        response.data.forEach(request => {
            const requestItem = document.createElement('li');
            requestItem.innerHTML = `
                <strong>${request.user.name}</strong> 
                <button onclick="acceptRequest(${request.userId}, ${groupId})">Accept</button>
                <button onclick="declineRequest(${request.userId}, ${groupId})">Decline</button>
            `;
            requestList.appendChild(requestItem);
        });

        const adminActionsDiv = document.getElementById('adminActions');
        adminActionsDiv.innerHTML = ''; // Clear previous content
        adminActionsDiv.appendChild(requestList);
    } catch (error) {
        console.error('Error fetching requests:', error);
        alert('Failed to fetch requests');
    }
}

async function acceptRequest(userId, groupId) {
    try {
        const token = localStorage.getItem('token');
        await axios.post('/isAdmin/accept', { userId, groupId }, {
            headers: { 'Authorization': token }
        });
        alert('Request accepted');
        manageRequests(groupId); // Refresh the list
    } catch (error) {
        console.error('Error accepting request:', error);
        alert('Failed to accept request');
    }
}

async function declineRequest(userId, groupId) {
    try {
        const token = localStorage.getItem('token');
        await axios.post('/isAdmin/decline', { userId, groupId }, {
            headers: { 'Authorization': token }
        });
        alert('Request declined');
        manageRequests(groupId); // Refresh the list
    } catch (error) {
        console.error('Error declining request:', error);
        alert('Failed to decline request');
    }
}
