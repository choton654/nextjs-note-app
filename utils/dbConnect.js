const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect('your mongo uri', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: false,
    });
    console.log(`Mongoodb connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnect;
