const http = require('http');

const hostname = '127.0.0.1';
const port = 3020;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

var fs = require("fs");

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

function SendEmail() {

var percent = (fs.readFileSync("percent.txt"))*100;

console.log(percent)

//maybe send email 
if(percent < 35) {
console.log('sent Email')
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ojoserver2@gmail.com',
        pass: '1234Qwerty%%'
    }
});

/*
const mailOptions = {
	from: 'ojotester@gmail.com', // sender address
	to: '123456789@messaging.sprintpcs.com', // list of receivers
	subject: 'Testing', // Subject line
	text: 'success?'// text body
};
*/

const mailOptions = {
	from: 'ojoserver2@gmail.com', // sender address
	to: 'ojotester@gmail.com', // list of receivers
	subject: 'OJO', // Subject line
	text: 'Hey! You have ' + percent + '% left', //text body
	// attach image
	attachments: [
	{filename: 'fridge.jpg',
	content: fs.createReadStream('C:/Users/magic/Desktop/Tech/OJO/fridge.jpg')}]
}

transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});
}

}

setInterval(SendEmail,5000);

});

// recieve emails?
// Step 1: Include required modules
var Imap = require('imap'),
    inspect = require('util').inspect; 
    var fs = require('fs'), fileStream; 

// Step 2: Declaring new imap object
var imap = new Imap({
  user: 'ojoserver2@gmail.com',
  password: '1234Qwerty%%', // Remember, using just password for authentication will only work if you have less secured apps enabled 
  host: 'imap.gmail.com', 
  port: 993,
  tls: true
});

// Step 3: Program to receive emails. 
// This pretty much contains receiving emails, deciding which parts of email to receive,
// and what do display on console after execution of program 
function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

// variable to determine whether or not to buy orange juice
var buyOJ = false;

imap.once('ready', function() {

openInbox(function(err, box) {
  if (err) throw err;
  //Unseen means you'll only get mails that are unseen
  imap.search([ 'UNSEEN', ['SINCE', 'June 15, 2018'] ], function(err, results) { 
    if (err) throw err;
	
	if(results === undefined || results.length == 0) return;
    var f = imap.fetch(results, { bodies: '' });
	
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno); 
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        console.log(prefix + 'Body');
        var email = stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
		// hardcoding in to get just the body of the email
		email.on('close', function(err) {
			fs.readFile('msg-1-body.txt', function (err, data) {
				if (err) throw err;
	
				// look for a confirmation to buy orange juice
				if(data.indexOf('yes') >= 0) {
					buyOJ = true;
				}
				console.log("Am I going to order you some OJ? " + buyOJ + "!");
			});
		});
		
      });
	  
      msg.once('attributes', function(attrs) {
        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
      });
	  
      msg.once('end', function() {
        console.log(prefix + 'Finished');
      });
    });
	
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
	
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect(); 
