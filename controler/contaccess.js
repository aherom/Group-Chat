const Group = require('../module/group');
const UserGroup = require('../module/userGroup');
const GroupRequest = require('../module/groupRequest');

exports.accessGroup = async (req, res) => {
    try {
        const { groupId } = req.body;
        const { userid } = req.user;

        const usergroup = await UserGroup.findOne({ where: { userId: userid,groupGroupId: groupId } });

        if (usergroup) {
            
            res.status(200).json({ isMember: true });
        } else {
            res.status(200).json({ isMember: false });
        }
    } catch (error) {
        console.error('Error accessing group:', error);
        res.status(500).send('Error accessing group');
    }
};