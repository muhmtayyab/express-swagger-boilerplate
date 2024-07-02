import { connection, connect, set } from 'mongoose';

const { MONGO_URL } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const Connect = () => {
  set('strictQuery', true);
  connect(MONGO_URL, options);
  connection.once('open', async () => {
    console.log('Connected to database');
});
  connection.on('error', (err) => {
  console.log('Error connecting to database  ', err);
});
};

Connect();
