const express = require('express');
const path = require("path");
const app = express();
var https = require('https');
var fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();

const homeRouter = require('./routes/home.routes')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const {auth, requiresAuth} = require('express-openid-connect');

const port = 3000;

const config = {
    authRequired: false,
    idpLogout: true,
    secret: process.env.SECRET,
    baseURL: process.env.APPURL || process.env.BASEURL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUERBASEURL,
    clientSecret: process.env.CLIENT_SECRET,
    authorizationParams: {
        response_type: 'code',
        //scope: "openid profile email"
    },
};

app.use(auth(config));

app.use('/', homeRouter);

if (process.env.APP_URL) {
    app.listen(process.env.PORT || port, () => console.log(`listening at port ${port}`));
} else {
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app)
        .listen(process.env.PORT || port, () => console.log(`listening at port ${port}`));
}


