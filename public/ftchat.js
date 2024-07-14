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
            headers: {'Authorization': token}});

        const groupList = document.getElementById('groupList');
        groupList.innerHTML = '';  // Clear previous list
        response.data.forEach(group => {  // Updated to response.data directly
            const groupElement = document.createElement('div');
            groupElement.textContent = group.name;
            groupList.appendChild(groupElement);
        });
    } catch (error) {
        console.error('Error fetching groups:', error);
        alert('Failed to fetch groups');
    }
}
fetchGroups();