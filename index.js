const http = require('http');
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || "8000";
const { parse } = require('querystring');
const { Connection, Request } = require("tedious");


var fs = require('fs');


const config = {
  authentication: {
    options: {
      userName: "cssaadmin", 
      password: "TeamR0cket!" 
    },
    type: "default"
  },
  server: "cssa.database.windows.net", 
  options: {
    database: "cssa", 
    encrypt: true
  }
};

const connection = new Connection(config);


connection.on("connect", err => {
  if (err) {
    console.error(err.meCssage);
  } else {
   // call db functions...
  }
});

app.get("/", (req, res) => {
  fs.readFile('public/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('*', function(req, res){
  fs.readFile('public/404.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
