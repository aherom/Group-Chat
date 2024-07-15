const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const contadmincontrole = require('../controler/contadmincontrole');


const GroupRequest = require('../module/groupRequest');
const UserGroup = require('../module/userGroup');
const Group = require('../module/group');
const User = require('../module/user');

router.use('/requests/:groupId', authenticateToken, async (req, res) => {
    try {
        const { groupId } = req.params;
        const requests = await GroupRequest.findAll({
            where: { groupGroupId: groupId },
            include: [User]
        });
        
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching group requests:', error);
        res.status(500).send('Error fetching group requests');
    }
});

router.use('/accept', authenticateToken, async (req, res) => {
    try {
        const { userId, groupId } = req.body;
         console.log('hiiiiifdhgggggggggggggggggggggggggggggggggggggggfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfgggggggg');
        await UserGroup.create({ userId,isAdmin:false, groupGroupId: groupId });
        await GroupRequest.destroy({
            where: { userId, groupGroupId: groupId }
        });

        res.status(200).send('User added to group and request removed');
    } catch (error) {
        console.error('Error accepting group request:', error);
        res.status(500).send('Error accepting group request');
    }
});

// Decline a group request
router.post('/decline', authenticateToken, async (req, res) => {
    try {
        const { userId, groupId } = req.body;

        await GroupRequest.destroy({
            where: { userId, groupGroupId: groupId }
        });

        res.status(200).send('Group request declined');
    } catch (error) {
        console.error('Error declining group request:', error);
        res.status(500).send('Error declining group request');
    }
});

router.use('/:groupId', authenticateToken,contadmincontrole.adminpanel);

module.exports = router;
