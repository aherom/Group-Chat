const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Message = require('../module/message');
const User = require('../module/user');

// Route to fetch messages for a specific group
router.use('/messages/:groupId', authenticateToken, async (req, res) => {
    try {
        const { groupId } = req.params;
         console.log(req.params);
        // Fetch messages for the given groupId and include the user details
        const messages = await Message.findAll({
            where: { groupGroupId: groupId },
            include: {
                model: User,
                attributes: ['name'] // Assuming User model has 'name' field
            },
            order: [['createdAt', 'ASC']] // Optional: order messages by creation time
        });

         console.log(messages);
        // Format messages to include userName and content
        const formattedMessages = messages.map(message => ({
            userName: message.user.name,
            content: message.content
        }));

        res.status(200).json(formattedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
});

module.exports = router;
