const router = require('express').Router();

const { RegisterEmplyoee, Login, VerifyToken } = require('../services/EmplyoeeService')
const { AddingAddress, ListAddressByCity } = require('../services/AddressService')


//Testing route
router.get('/', (req, res) => {
    res.send({
        status: res.status.code,
        message: 'Welcome To Inovent API'
    })
})

router.post('/register', RegisterEmplyoee);
router.post('/login', Login);
router.post('/add-address', AddingAddress);
router.get('/list-all-by-city', VerifyToken, ListAddressByCity)


module.exports = router