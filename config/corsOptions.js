const dotenv = require('dotenv');
const allowedOrigins = [];
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(process.env.WEB_URL);
} else {
  allowedOrigins.push('*', 'http://localhost:3000');
}

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions, allowedOrigins };
