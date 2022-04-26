const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    const title = 'Currency Converter';
    res.render('Home', {title: 'Currency Converter'});
});


router.post('/convert', (req,res) => {
    res.send(req.body);
});




module.exports = router;
