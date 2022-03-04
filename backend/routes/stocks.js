const router = require('express').Router();
let Stock = require('../models/stock.model');

router.route('/').get((req, res) => {
  Stock.find()
    .then(stocks => res.json(stocks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const quantity = Number(req.body.quantity);
  const amount = Number(req.body.amount);
  const current_value = Number(req.body.current_value);
  const transaction_type = req.body.transaction_type;
  const transaction_date = Date.parse(req.body.transaction_date);

  const newStock = new Stock({
    username,
    transaction_type,
    quantity,
    amount,
    current_value,
    transaction_date,
  });

  newStock.save()
  .then(() => res.json('Stock added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Stock.findById(req.params.id)
    .then(stock => res.json(stock))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Stock.findByIdAndDelete(req.params.id)
    .then(() => res.json('Stock deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Stock.findById(req.params.id)
    .then(stock => {
        stock.username = req.body.username;
        stock.quantity = Number(req.body.quantity);
        stock.amount = Number(req.body.amount);
        stock.current_value = Number(req.body.current_value);
        stock.transaction_type = req.body.transaction_type;
        stock.transaction_date = Date.parse(req.body.transaction_date);
      stock.save()
        .then(() => res.json('Stock updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;