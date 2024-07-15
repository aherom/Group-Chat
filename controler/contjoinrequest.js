const GroupRequest = require('../module/groupRequest');

exports.addUser = async (req, res) => {
    try {
        const { groupId } = req.body;
        const { userid } = req.user;

       
        const alreadyExist = await GroupRequest.findOne({
            where: { 
                userId: userid,
                groupGroupId: groupId
            }
        });

        if (alreadyExist) {
            return res.status(400).send('Request already exists');  // Use 400 for a bad request
        }

        await GroupRequest.create({
            userId: userid,
            groupGroupId: groupId
        });

        res.status(201).send('Request sent successfully');
    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).send('Error sending request');
    }
};
