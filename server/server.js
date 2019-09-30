const express = require("express");

const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const config = require("./config");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const path = require("path");

// connect all routes
routes(app);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.createServer(app)
  .listen(config.port, () => {
    //  mongoose connect


    mongoose.connection
      .on("error", error => console.log(error))
      .on("close", () => console.log("Database Connection closed"))
      .on("open", () => console.log("Database succes connection"));

    mongoose.connect(config.mongoUri, { useNewUrlParser: true, dbName: "Stepan", useCreateIndex: true });
    console.log(`========== server are listen ${config.port} port =========`);
  });
