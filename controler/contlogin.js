const bcrypt = require('bcrypt');
const user = require('../module/user');

exports.login = async (req, res) => {
    try {
        const { emailorphone, password } = req.body;

        const isEmail = emailorphone.includes('@');

        const userRecord = isEmail
            ? await user.findOne({ where: { email: emailorphone } })
            : await user.findOne({ where: { phone: emailorphone } });

        if (!userRecord) {
            return res.status(404).send('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(password, userRecord.password);
        if (!isPasswordMatch) {
            return res.status(401).send('Invalid password');
        }

        res.status(200).send('Login successful');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
};
