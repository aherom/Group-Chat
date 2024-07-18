require('dotenv').config();


const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const dbconfig = require('./util/dbconfig');
const User = require('./module/user');
const Group = require('./module/group');
const UserGroup = require('./module/userGroup');
const Message = require('./module/message');
const GroupRequest = require('./module/groupRequest');

const singin = require('./router/singin');
const routgroup = require('./router/routgroup');
const access = require('./router/access');
const displaymessage = require('./router/displaymessage');
const routadmin = require('./router/routadmin');
const joinrequest = require('./router/joinrequest');
const addmessage = require('./router/addmessage')
const see = require('./router/see');
const uploadRouter = require('./router/upload');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const { authenticateToken } = require('./middleware/auth');

// Define associations
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

UserGroup.belongsTo(User, { foreignKey: 'userId' });
UserGroup.belongsTo(Group, { foreignKey: 'groupGroupId' });

User.hasMany(UserGroup, { foreignKey: 'userId' });
Group.hasMany(UserGroup, { foreignKey: 'groupGroupId' });

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "view")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


app.use('/user', singin);
app.use('/create', routgroup);
app.use('/group', routgroup);
app.use('/group', access);
app.use('/group', addmessage(io)); 
app.use('/find', displaymessage);
app.use('/isAdmin', routadmin);
app.use('/add', joinrequest);
app.use('/see', see);
app.use('/upload', uploadRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "view", "login.html"));
});

dbconfig.sync();
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinGroup', (groupId) => {
        socket.join(groupId);
        console.log(`User joined group ${groupId}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

module.exports = io;
