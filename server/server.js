const express = require("express")
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

http.createServer(app).listen(8080, () => {

  routes(app); // connect all routes
  
//  mongoose connect
  mongoose.connection
   .on("error", (error) => console.log(error))
   .on("close",() => console.log("Database Connection closed"))
   .on("open", () => console.log("Database succes connection"));
   
   mongoose.connect("mongodb://localhost/stepan", {useNewUrlParser: true});
  console.log('========== server are listen 8080 port =========')
});