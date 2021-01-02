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
  fs.readFile('public/website/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get("/environment/dashboard", (req, res) => {
  fs.readFile('public/environment/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('/about', function(req, res){
  fs.readFile('public/website/about.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get("/sign", (req, res) => {
  fs.readFile('public/website/sign.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.get('*', function(req, res) {
  fs.readFile('public/website/404.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
});

app.post('/registration', function (req, res) {
 	var ans = "";
    req.on('data', function(data) {
      var obj = JSON.parse(data);
      const requestA= new Request(
        `INSERT INTO IdentityOfIndividual
         VALUES ('` + obj.Email + `', '` + obj.Username + `', '` + obj.First + `', '`+ obj.Last + `', '` + obj.Password + `');`,
        (err, result) => {
          if (err) {
            console.error(err.message);
          } else {
              ans = `${result}`;     
              if(ans == "1"){
				  res.send(ans);
			  } else {
				  res.send("ok");
			  }
          }
        }
      );     
    connection.execSql(requestA);
    })
});

app.post('/check', function (req, res) {
  var ans = "";
  req.on('data', function(data) {
    var obj = JSON.parse(data);
    const requestA= new Request(
      `SELECT * FROM IdentityOfIndividual WHERE (Username = '` + obj.Unknown +  `' OR Scopecode = '` + obj.Unknown +  `') AND Credentials = '` + obj.Password +  `'`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
            ans = `${rowCount}`;      
            if(ans == 0) {
              res.send("false");
            }
        }
      }
    );

	var computedInfo = {"info":[]};
	requestA.on("row", columns => {
		columns.forEach(column => {
			computedInfo.info.push(column.value);
		});
		res.send(computedInfo);
	});
	
    connection.execSql(requestA);

  })
});

app.post('/checkUsername', function (req, res) {
  var ans = "";
  req.on('data', function(data) {
    const requestB= new Request(
      `SELECT * FROM IdentityOfIndividual WHERE Username = '` + data +  `'`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
            ans = `${rowCount}`;      
			res.send(ans);
        }
      }
    );
    connection.execSql(requestB);
  })
});

app.post('/checkEmail', function (req, res) {
  var ans = "";
  req.on('data', function(data) {
    const requestC= new Request(
      `SELECT * FROM IdentityOfIndividual WHERE Scopecode = '` + data +  `'`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
            ans = `${rowCount}`;      
			res.send(ans);
        }
      }
    );
    connection.execSql(requestC);
  })
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
