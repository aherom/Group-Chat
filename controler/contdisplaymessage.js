const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const Message = require('../module/message');
const User = require('../module/user');
const router = express.Router();

// Fetch messages for a specific group
exports.displaymessage = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const messages = await Message.findAll({
            where: { groupGroupId: groupId },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'ASC']]
        });

        const formattedMessages = messages.map(message => ({
            userName: message.user.name,
            content: message.content
        }));

        res.json(formattedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
};

