const createGroupBtn = document.getElementById('createGroupBtn');

createGroupBtn.addEventListener('click', async () => {
    try {
        const token = localStorage.getItem('token');
        const groupName = prompt('Enter Group Name:');
        if (!groupName) return; 

        const response = await axios.post('/create/group', { name: groupName }, {
            headers: {
                'Authorization': token
            }
        });

        console.log(response.data); 

        
    } catch (error) {
        console.error('Error creating group:', error);
        
    }
});



async function fetchGroups() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/group/list', {
            headers: { 'Authorization': token }
        });

        const groupList = document.getElementById('groupList');
        groupList.innerHTML = '';  // Clear previous list
        response.data.forEach(group => {  // Updated to response.data directly
            const groupElement = document.createElement('div');
            groupElement.textContent = group.name;

            const messageButton = document.createElement('button');
            messageButton.textContent = 'Message';
            messageButton.addEventListener('click', () => accessGroup(group.groupId));

            groupElement.appendChild(messageButton);
            groupList.appendChild(groupElement);
        });
    } catch (error) {
        console.error('Error fetching groups:', error);
        alert('Failed to fetch groups');
    }
}


async function accessGroup(groupId) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('/group/access', { groupId }, {
            headers: { 'Authorization': token }
        });

        if (response.data.isMember) {
            alert('Welcome to chat');
            window.location.href = `message.html?groupId=${groupId}`;
        } else {
            const joinRequest = confirm('You are not a member. Do you want to send a request to join this group?');
            if (joinRequest) {
                await axios.post('/add/user', { groupId }, {
                    headers: { 'Authorization': token }
                });
                alert('Request sent');
            }
        }
    } catch (error) {
        console.error('Error accessing group:', error);
        alert('Failed to access group');
    }
}


fetchGroups();