require("dotenv").config();
const express = require("express"),
    bodyParser = require("body-parser"),
    usersCtrl = require("./usersCtrl");


const app = express();
const {SERVER_PORT} = process.env

// MIDDLEWARE
app.use(bodyParser.json())

// ENDPOINTS
app.get("/api/users", usersCtrl.readAllUsers);
app.get("/api/users/:userId", usersCtrl.readUserByID);
app.get("/api/admins", usersCtrl.readUserAdmins);
app.get("/api/nonadmins", usersCtrl.readUserNonAdmins);
app.get("/api/user_type/:userType", usersCtrl.readUserType);
app.put("/api/users/:userId", usersCtrl.updateUser);
app.post("/api/users", usersCtrl.createUser);
app.delete("/api/users/:userId", usersCtrl.deleteUser);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
    
})
