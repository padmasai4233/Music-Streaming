const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            return res.status(500).send('<h1>Internal Server Error</h1>');
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(401).render('invalidCredentails',{Invalid:"Invalid Username"});
        }

        if (user.password !== password) {
            return res.status(401).render('invalidCredentails',{Invalid:"Invalid Password"});
        }

        req.session.userId = user.username; 
        req.session.user = user;

        return res.redirect('/dashboard');
    });
});

router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/signin.html');
    }
    const dashboardPath = path.join(__dirname, '../views/dashboard.html');
    res.sendFile(dashboardPath);
});

router.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Could not log out. Please try again.");
        }

        res.redirect('/signin.html');
    });
});

module.exports = router;
