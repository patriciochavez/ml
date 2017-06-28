var mqtt = require('mqtt');
var csv = require('ya-csv');
var PythonShell = require('python-shell');
var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var options = {
  port: '1883',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'mi_usuario',
  password: 'mi_clave',
  protcolId: "MQSsdp"
};

var w = csv.createCsvFileWriter('wifiscan.csv', {'flags': 'a'});

var mqttclient = mqtt.connect('mqtt://10.105.231.153', options);

mqttclient.on('connect', function() {
	mqttclient.subscribe('machinelearning/wifi');	
});

mqttclient .on('message', function (topic, message) {  
  console.log(message.toString());
  var data = message.toString().split(',');
  w.writeRecord(data);
});

var httpServer = http.createServer(app).listen(8080);

app.get(/^(.+)$/, function(req, res){ 
    switch(req.params[0]) {
        case '/test':
            res.send("\n\nTEST OK!\n");
            break;
	case '/vlz':
		var pyshell = new PythonShell('vlz.py');
		pyshell.on('message', function (message) {
			res.send(message);
			res.end();
		});			
		// end the input stream and allow the process to exit
		pyshell.end(function (err) {
		  if (err) throw err;
			  console.log('finished');
			});
            break;
 default: 
        res.sendFile( __dirname + req.params[0]); 
    }
 });
