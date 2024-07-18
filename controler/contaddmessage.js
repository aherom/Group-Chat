const Message = require('../module/message');
const User = require('../module/user');

module.exports = (io) => {
    return {
        addMessage: async (req, res) => {
            try {
                const { content, groupId, filePath } = req.body;
                const { userid } = req.user;

                const user = await User.findOne({ where: { id: userid } });
                if (!user) {
                    return res.status(404).send('User not found');
                }

                const userName = user.name;

                const message = await Message.create({
                    content: content,
                    userId: userid,
                    groupGroupId: groupId,
                    userName: userName,
                    filePath: filePath // Save the file path if available
                });

                
                io.to(groupId).emit('message', {
                    userName: userName,
                    content: content,
                    filePath: filePath
                });

                res.status(201).send('Message added successfully');
            } catch (error) {
                console.error('Error adding message:', error);
                res.status(500).send('Error adding message');
            }
        }
    };
};
