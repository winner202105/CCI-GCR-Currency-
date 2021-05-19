const express = require('express');

// 通貨変換テーブル
const currencyArray = [
    { unit: "JPY", rate: 1 },
    { unit: "USD", rate: 104.49 },
    { unit: "EUR", rate: 124.86 },
    { unit: "CNY", rate: 15.21 },
    { unit: "KRW", rate: 0.0892 },
    { unit: "AUD", rate: 83.62 }, 
  ];
  
// APIの実装
const app = express();
app.use(express.json());

app.get('/api/list', (req, res) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(currencyArray);
});

app.get('/api/convert', (req, res) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    var currency = currencyArray.find(c => c.unit === req.query.unit);
    if (! currency) return res.status(200).send({'error': 'unitNotSupported'});

    var value = parseFloat(req.query.value);
    var amount =
        Math.round(value * currency.rate * 100) / 100;
    res.status(200).send({ 'amount': amount });
});

// Server
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0'
module.exports = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
