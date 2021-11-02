const express = require('express');
const path = require("path");
const app = express();
var https = require('https');
var fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

let last5 = []
const homeRouter = require('./routes/home.routes')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { auth, requiresAuth } = require('express-openid-connect');
const port = 3000;

const config = {
    authRequired : false,
    idpLogout : true,
    secret: process.env.SECRET,
    baseURL: `https://localhost:${port}`,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: 'https://dev-0g7y10b0.us.auth0.com',
    clientSecret: process.env.CLIENT_SECRET,
    authorizationParams: {
        response_type: 'code' ,
        //scope: "openid profile email"
    },
};

app.use(auth(config));

app.use('/', homeRouter);

/*app.get('/', (req, res) => {
    if(req.oidc.isAuthenticated){
        if(!last5.find(user => user !== undefined &&  user.email === req.oidc.user.email)){
            if(last5.length >= 5){
                last5.shift()
            }
            last5.push(req.oidc.user);
        }
    }
    console.log(last5)
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});*/

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/lastfive', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(last5))
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(port, () => console.log(`listening at port ${port}`));
