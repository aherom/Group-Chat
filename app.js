const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const dbconfig = require('./util/dbconfig');
const User = require('./module/user');
const Group = require('./module/group');
const UserGroup = require('./module/userGroup');
const Message = require('./module/message');
const GroupRequest = require('./module/groupRequest');

const singin = require('./router/singin');
const routgroup = require('./router/routgroup');

const app = express();

const { authenticateToken } = require('./middleware/auth');

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.hasMany(GroupRequest);
GroupRequest.belongsTo(User);

Group.hasMany(GroupRequest);
GroupRequest.belongsTo(Group);



app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "view")));

app.use('/user', singin);

app.use('/create',routgroup);

app.use('/group',routgroup);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "view", "login.html"));
});

dbconfig.sync();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
