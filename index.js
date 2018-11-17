/* I understand how this works

var http = require('http');

http.createServer(function(request, response) {
	// send http header
	// http status: 200 means ok
	// content type: text/plain
	response.writeHead(200, {'Content-Type': 'text/html'});
	
	// read from an input file
	var fs = require('fs');
	var data = fs.readFileSync('input.html');
	
	// send the response body 
	response.end(data.toString());
}).listen(3000);

// Print a console message that the website is running
console.log('Server running at http://127.0.0.1:3000/');


// An example of event handling in node

var events = require('events');

var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
	console.log('connection successful.');
	
	eventEmitter.emit('data_recieved');
}

eventEmitter.on('connection', connectHandler);

eventEmitter.on('data_recieved', function() {
	console.log('data recieved successfullly.');
});

eventEmitter.emit('connection');

console.log('Program ended.');


// This is some error handling in node

var fs = require('fs');

fs.readFile('input.txt', function (err, data) {
	if(err) {
		console.log(err.stack);
		return;
	}
	console.log(data.toString());
});
console.log('Program ended');
*/


const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'youremail@address.com',
        pass: 'yourpassword'
    }
});

const mailOptions = {
	from: 'magicqwertyuiop@gmail.com', // sender address
	to: 'magicqwertyuiop@gmail.com', // list of receivers
	subject: 'Testing', // Subject line
	html: '<p>success?</p>'// html text body
};

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});

