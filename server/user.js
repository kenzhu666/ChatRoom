const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const userExist = users.find(user => user.room === room && user.name === name);

    if (!name || !room) return { error: '请填写用户名和密码' };

    if (userExist) {
        return { error: '用户名以被使用，请您换个名字～' }
    }
    const user = { id, name, room };
    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find(user => user.id === id);

const getUserRoom = (room) => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserRoom };