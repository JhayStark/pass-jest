const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConnect');
const credentials = require('./config/credentials');
const { corsOptions, allowedOrigins } = require('./config/corsOptions');
const PassData = require('./pass.model');

dotenv.config();
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(credentials);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 3001;

app.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const dataSaved = await PassData.create({ name });
    console.log(dataSaved);
    res.status(200).json({ message: 'saved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

(async function start() {
  await dbConnect();
  app.listen(port, () => {
    console.log(`Server is running on:${port}`);
  });
})();
