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


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'bar@example.com, baz@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
