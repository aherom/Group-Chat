const Message = require('../module/message');
const User = require('../module/user');

exports.displaymessage = async (req, res) => {
    try {
        const { groupId } = req.params;
         console.log(req.params);
       
        const messages = await Message.findAll({
            where: { groupGroupId: groupId },
            include: {
                model: User,
                attributes: ['name'] 
            },
            order: [['createdAt', 'ASC']] 
        });

        
        
        const formattedMessages = messages.map(message => ({
            userName: message.user.name,
            content: message.content
        }));

        res.status(200).json(formattedMessages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
}