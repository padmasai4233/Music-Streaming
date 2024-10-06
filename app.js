const express = require('express');
const path = require('path');
const url = require('url');
const session = require('express-session');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(session({
    secret: 'thinkers',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.get('/musicApi.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'musicApi.json'));
});


app.post('/register', registerRoute);
app.post('/login', loginRoute);
app.use('/', loginRoute); 


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); 
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html')); 
});

app.use((req, res) => {
    const filePath = path.join(__dirname, 'views', url.parse(req.url, true).pathname);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('File not found:', err);
            res.status(404).send('<h1>404 Not Found</h1>');
        }
    });
});


app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(5865, () => {
    console.log('Server is running @ http://localhost:5865');
});

