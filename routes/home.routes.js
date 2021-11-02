let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.send("Logiran")
    }else {
        res.render('home', {
            locations: JSON.stringify([{lat: 40.748817, lon: -73.985428}, {
                lat: 40.748817,
                lon: -73.985428
            }])
        })
    }
});

module.exports = router;
