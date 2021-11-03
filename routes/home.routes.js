let express = require('express');
let router = express.Router();

const last5 = []

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

//ova metoda sluzi za dodati korisnike u listu posljednjih 5 korisnika
//ukoliko je korisnik već na listi, onda ga se ne dodaje
//ukoliko je na listi vec dodano 5 korisnika, najdavniji se brise i dodaje novi
router.post('/location', async (req, res) => {
    const data = await req.body;
    console.log(data)
    if(data !== undefined){
        if (last5.find(userData =>userData.email === data.email)) {
            console.log(`user ${data.email} already in the list`)
        } else {
            if(last5.length >= 5){
                last5.shift()
            }
            last5.push(data);
        }
    }
    console.log(last5)
})

module.exports = router;
