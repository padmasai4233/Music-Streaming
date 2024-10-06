const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

router.post('/register', (req, res, next) => {
    const { username, email, password, genre } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    const newUser = {
        username,
        email,
        password,
        genre
    };

    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users file.');
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        users.push(newUser);

        
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing to users file.');
            }
            
            res.render('register_Success', { username: username });
        });
    });
});

module.exports = router;
