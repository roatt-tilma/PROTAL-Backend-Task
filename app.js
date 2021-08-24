const express = require('express');
const alert = require('alert');
const mongoose = require('mongoose');
const User = require('./user');

const app = express();

mongoose.connect('mongodb+srv://Roatt:roatt123@cluster0.8jsv8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, err => {
    if (err) console.log(err);
    else console.log('db connected');
});

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

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email: email});
    if (!user){
        alert("User not registered");
        res.redirect('/signup');
    }
    else{
        if(user.password===password){
            res.render('meme', { title: 'MEME', email: email });
            res.send("You are logged in...");
        }    
        else{
            alert("Wrong info...");
            res.redirect('/login');
        }
    }

})

app.post('/signup', async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const email = req.body.email;
    const info = `Hi! this is ${email}. I welcome you all to my profile.`;

    const user = await User.findOne({email: email});

    if (user){
        alert("User already registered");
        res.redirect('/login');
    }
    else{
        if (password === confirmPassword){
        
            const userData = new User({
                email: email,
                password: password,
                info: info
            })
    
            await userData.save();
            alert("Signup Successful");
            res.redirect('/');
        }
        else{
            alert("Passwords didn't match");
            res.redirect('/signup');
        }
    }
})

app.get('/intro', async(req, res) => {
    res.render('intro', {title: 'INTRO'})
})
