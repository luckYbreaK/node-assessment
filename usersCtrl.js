const userData = require("./userData.json");

module.exports = {
    readAllUsers: (req, res) => {
        if (req.query.favorites) {
            let { favorites } = req.query
            let result = userData.filter(user => user.favorites.includes(favorites))
            res.status(200).send(result);
        } else if (req.query.age) {
            let { age } = req.query
            let result = userData.filter(user => user.age < age)
            res.status(200).send(result);
        } else if (req.query.lastname) {
            let { lastname } = req.query
            let result = userData.filter(user => user.last_name === lastname)
            res.status(200).send(result);
        } else if (req.query.email) {
            let { email } = req.query
            let result = userData.filter(user => user.email === email)
            res.status(200).send(result);
        }
        res.status(200).send(userData);

    },
    readUserByID: (req, res) => {
        let { userId } = req.params;
        let result = userData.filter(user => user.id === Number(userId))
        if (result.length > 0) {
            res.status(200).send(result[0]);
        } else {
            res.status(404).json(null);
        }
    },
    readUserAdmins: (req, res) => {
        let result = userData.filter(user => user.type === "admin");
        res.status(200).send(result);
    },
    readUserNonAdmins: (req, res) => {
        let result = userData.filter(user => user.type !== "admin");
        res.status(200).send(result);
    },
    readUserType: (req, res) => {
        let { userType } = req.params;
        let result = userData.filter(user => user.type === userType);
        res.status(200).send(result);
    },
    updateUser: (req, res) => {
        let { body, params } = req;
        let index = userData.findIndex(user => user.id === Number(params.userId))
        userData[index] = body;
        res.status(200).send(userData);

    },
    createUser: (req, res) => {
        let { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body
        let user = {
            id: userData[userData.length - 1].id + 1,
            first_name,
            last_name,
            email,
            gender,
            language,
            age,
            city,
            state,
            type,
            favorites
        }
        userData.push(user)
        res.status(200).send(userData)
    },
    deleteUser: (req, res) => {
        let { params } = req;
        let index = userData.findIndex(user => user.id === Number(params.userId))
        userData.splice(index, 1)
        res.status(200).send(userData);
    }
}