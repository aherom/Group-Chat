const Group = require('../module/group');
const UserGroup = require('../module/userGroup');

exports.newgroup = async (req, res) => {
    try {
        const { name } = req.body;
        const { userid } = req.user; 

        
        const newGroup = await Group.create({ name });

        
        await UserGroup.create({
            UserId: userid,
            GroupId: newGroup.id,
            isAdmin: true
        });

        res.status(201).send('Group created successfully');
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).send('Error creating group');
    }
}


exports.listGroups = async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).send('Error fetching groups');
    }
}