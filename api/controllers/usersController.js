const fs = require("fs");
const path = require("path");

//recupero la lista de usuarios, respondo con un array conteniendo todos los usuarios del sistema

const getUsers = (req, res) => {
  try {
    let users = fs.readFileSync(
      path.join(__dirname, "../data/users.json"),
      "utf-8"
    );
    users = JSON.parse(users);
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los usuarios" });
    const usersArray = JSON.parse(users);
    res.send(usersArray);
  }
};

module.exports = {
  getUsers,
};
