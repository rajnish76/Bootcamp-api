const mongoose = require('mongoose');

const connectdb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log('Database is connected'))
    .catch(() => console.log('Something went wrong'));
};

module.exports = connectdb;
