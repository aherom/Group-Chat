const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const User = require('../module/user');
const UserGroup = require('../module/userGroup');

router.use('/members/:groupId', async (req, res) => {
    const { groupId } = req.params;

    try {
        const userGroups = await UserGroup.findAll({
            where: { groupGroupId: groupId },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'ASC']]
        });

        const members = userGroups.map(userGroup => {
            return {
                userGroupId: userGroup.userGroupId,
                userId: userGroup.userId,
                isAdmin: userGroup.isAdmin,
                groupGroupId: userGroup.groupGroupId,
                userName: userGroup.user.name 
            };
        });
        
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.use('/admin',authenticateToken,async(req,res)=>{
    const {userId, groupId} = req.body;

    const updatetoadmin = await UserGroup.findOne({where:{userId:userId,
        groupGroupId: groupId}});

        if (updatetoadmin) {
            await updatetoadmin.update({ isAdmin: true });
            res.status(200).send('User promoted to admin');
        } else {
            res.status(404).send('UserGroup not found');
        }
})



router.use('/remove',authenticateToken,async(req,res)=>{
    const {userId, groupId} = req.body;

    await UserGroup.destroy({where:{userId:userId,
        groupGroupId: groupId}});

        res.status(200)
})


module.exports = router;