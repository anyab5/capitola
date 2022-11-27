const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const tower = require('./routes/tower');
const user = require('./routes/user');
const carrier = require('./routes/carrier');

const port = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

app.use('/tower', tower);
app.use('/user', user);
app.use('/carrier', carrier);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(function (err, req, res, next) {
  if (!err) {
    next();
  }
  console.error('General server error ', err);
  res.status(500).send({ message: 'InternalError' });
  next(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
