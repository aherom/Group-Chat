const UserGroup = require('../module/userGroup');

exports.adminpanel = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userid } = req.user;
     
        const userGroup = await UserGroup.findOne({
            where: {
                userId: userid,
                groupGroupId: groupId,
                isAdmin: true
            }
        });
        

        if (userGroup) {
            res.status(200).json({ isAdmin: true });
        } else {
            res.status(200).json({ isAdmin: false });
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
        res.status(500).send('Error checking admin status');
    }
}