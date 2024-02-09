const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/bankingApp', {});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  currentBalance: Number,
});

const transferSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);
const Transfer = mongoose.model('Transfer', transferSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Dummy Data
const dummyCustomers = [
  { name: 'Customer 1', email: 'customer1@email.com', currentBalance: 2000 },
  { name: 'Customer 2', email: 'customer2@email.com', currentBalance: 4000 },
  { name: 'Customer 3', email: 'customer3@email.com', currentBalance: 1000 },
  { name: 'Customer 4', email: 'customer4@email.com', currentBalance: 7500 },
  { name: 'Customer 5', email: 'customer5@email.com', currentBalance: 0 },
  { name: 'Customer 6', email: 'customer6@email.com', currentBalance: 900 },
  { name: 'Customer 7', email: 'customer7@email.com', currentBalance: 12000 },
  { name: 'Customer 8', email: 'customer8@email.com', currentBalance: 100 },
];

// Initialize Dummy Data
Customer.countDocuments({})
  .then((count) => {
    if (count === 0) {
      return Customer.insertMany(dummyCustomers);
    }
  })
  .then(() => {
    console.log('Dummy data inserted.');
  })
  .catch((err) => {
    console.error(err);
  });

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/customers', (req, res) => {
  Customer.find({})
    .then(customers => {
      res.render('customers', { customers });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/customer/:id', (req, res) => {
  const customerId = req.params.id;
  Customer.findById(customerId)
    .then(customer => {
      res.render('customer', { customer });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/transfer/:id', (req, res) => {
  const senderId = req.params.id;
  Customer.find({})
    .then(customers => {
      res.render('transfer', { senderId, customers });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/transfer/:id', (req, res) => {
  const senderId = req.params.id;
  const receiverId = req.body.receiver;
  const amount = parseFloat(req.body.amount);

  // Update sender's balance
  Customer.findById(senderId)
    .then(sender => {
      if (!sender) {
        throw new Error('Sender not found');
      }
      sender.currentBalance -= amount;
      return sender.save();
    })
    .then(() => {
      // Update receiver's balance
      return Customer.findById(receiverId);
    })
    .then(receiver => {
      if (!receiver) {
        throw new Error('Receiver not found');
      }
      receiver.currentBalance += amount;
      return receiver.save();
    })
    .then(() => {
      // Record the transfer
      const transfer = new Transfer({
        sender: senderId,
        receiver: receiverId,
        amount: amount,
      });
      return transfer.save();
    })
    .then(() => {
      res.redirect('/customers');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
