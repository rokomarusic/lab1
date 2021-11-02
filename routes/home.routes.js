let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {

    console.log(req.oidc.isAuthenticated())

        res.render('home', {
            locations: JSON.stringify([{lat: 40.748817, lon: -73.985428}, {
                lat: 40.748817,
                lon: -73.985428
            }]),
            currentUser: req.oidc.isAuthenticated() ? JSON.stringify(req.oidc.user) : undefined
        })

});

router.post('/location', async (req, res) => {
    const data = await req.body;
    console.log(data)
})

module.exports = router;
