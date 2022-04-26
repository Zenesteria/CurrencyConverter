const express = require('express');
const ejs = require('ejs');
const axios = require('axios');

const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs')

// Routes
let currencies;

app.get('/', (req,res) => {
    axios.get('https://api.getgeoapi.com/v2/currency/list?api_key=f17a2910c0dc34239638ab8e32a478db6d9a1a4b')
        .then((response) => {
            const data = response.data;
            currencies = Object.keys(data.currencies).sort();
            res.render('Home', {currencies: currencies, title: 'Currency Converter', result:'select your currencies to convert',prevData: ['USD', 'NGN', '0']});
        });
    // res.render('Home', {currencies:['currencies','a','b'], title: 'Currency Converter', result:'select your currencies to convert', prevData: ['', '', '0']});
});


app.post('/convert', (req,res) => {
    const { base_currency, target_currency, amt_base_currency } = req.body;
    axios.get(`https://api.getgeoapi.com/v2/currency/convert?api_key=f17a2910c0dc34239638ab8e32a478db6d9a1a4b&from=${base_currency}&to=${target_currency}&amount=${amt_base_currency}&format=json`)
    .then((response) => {
        const result = response.data;
        const amt = Number(Number(Object.values(result.rates)[0].rate_for_amount).toFixed(2));
        const currencyAmt = amt.toLocaleString('ja-JP',{ style: 'currency', currency: `${target_currency}`})

        res.render('Home', {currencies: currencies, title: 'Currency Converter', result:`Amt: ${currencyAmt}`, prevData: [base_currency, target_currency, amt_base_currency]});
    })
});

app.listen(process.env.PORT || port, () => {
    console.log(`Running on Port ${port}`)
});