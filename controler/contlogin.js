const bcrypt = require('bcrypt');
const user = require('../module/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key';

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
         
        const token = jwt.sign({ 
            userid: userRecord.id
          }, JWT_SECRET);

          res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
};
