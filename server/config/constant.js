require("dotenv").config();

module.exports = {
  db: {
    MONGO_URI: process.env.MONGO_URI,
  },
  general: {
    PORT: 4040,
    NODE_ENV: process.env.NODE_ENV,
    URL: process.env.URL
  },

};
