const Message = require('../module/message');
const User = require('../module/user');

exports.addMessage = async (req, res) => {
    try {
        const { content, groupId } = req.body;
        const { userid } = req.user;
        // Fetch the userName from the User table
        const user = await User.findOne({ where: { id: userid} });
          if (!user) {
             return res.status(404).send('User not found');
        }
        console.log("xzscdfxghjkiohkgfcxdcghjklhgfdx",req.body,);

        const userName = user.name; 

        await Message.create({
            content:content,
            userId:userid,
            groupGroupId:groupId,
            userName:userName 
        });
       

        res.status(201).send('Message added successfully');
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).send('Error adding message');
    }
}