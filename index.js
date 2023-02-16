const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const app = express();
const https = require("https");
const fs = require("fs");

const routes = require("./routes");

const port = 3000;

app.use(cors());

app.use(bodyParse.json());
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);

app.use('/', routes);

https
  .createServer({
      key: fs.readFileSync("./privado.pem"),
      cert: fs.readFileSync("./publico.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`App running on port ${port}.`);
  });