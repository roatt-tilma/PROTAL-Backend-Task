const express = require('express');
const alert = require('alert');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening');
})

//routes

app.get('/', (req, res) => {
    res.render('index', { title: 'HOME'});    
})

app.get('/login', (req, res) => {
    res.render('login', { title: 'LOGIN'});
})

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'SIGNUP'});
})

app.post('/login', (req, res) => {
    
})

app.post('/signup', (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password === confirmPassword){
        res.redirect('/');
    }
    else{
        alert("Passwords didn't match");
        res.redirect('/signup');
    }
})
