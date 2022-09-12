const fs = require("fs");
const path = require("path");

//recupero la lista de usuarios, respondo con un array conteniendo todos los usuarios del sistema

const getUsers = (req, res) => {
  try {
    let users = fs.readFileSync(
      path.join(__dirname, "../data/users.json"),
      "utf-8"
    );
    // users = JSON.parse(users);
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los usuarios" });
    const usersArray = JSON.parse(users);
    res.send(usersArray);
  }
};

//recupero el user con el id solicitado.
//Responde con la informacion completa del usuario solicitado
//si no existe, respondo con un mensaje de error

const getUserById = (req, res) => {
  try {
    let users = fs.readFileSync(
      path.join(__dirname, "../data/users.json"),
      "utf-8"
    );
    users = JSON.parse(users);
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al obtener el usuario" });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
