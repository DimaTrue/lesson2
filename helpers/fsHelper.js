const fs = require('fs/promises');
const path = require('path');

const pathToUsers = path.join(__dirname, '../dataBase/users.json');

module.exports = {
  getParsedUsers: async () => {
    try {
      const fileContent = await fs.readFile(pathToUsers);

      return JSON.parse(fileContent.toString());
    } catch (err) {
      console.log(err);
    }
  },
  addNewUserToJson: async (users, newUser) => {
    try {
      users.push(newUser);
      const newContent = JSON.stringify(users);
      await fs.writeFile(pathToUsers, newContent);
    } catch (err) {
      console.log(err);
    }
  },
};
