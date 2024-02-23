const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require("./app/middleware/dbConnect");
const app = express();

const PORT = process.env.SERVER_PORT || 8080;
const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;

var corsOptions = {
  origin: `{CLIENT_HOST}:{CLIENT_PORT}`,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

require("./app/routes/authRoutes")(app);
require("./app/routes/userRoutes")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
