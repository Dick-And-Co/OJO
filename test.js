const http = require('http');

const hostname = '127.0.0.1';
const port = 3020;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

function SendEmail() {

var fs = require("fs");

var percent = (fs.readFileSync("percentage.txt"))*100;

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
	text: 'Hey! You have ' + percent + '% left' //text body
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
/* This pretty much contains receiving emails, deciding which parts of email to receive,
and what do display on console after execution of program */
function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {

openInbox(function(err, box) {
  if (err) throw err;
  // Change the date with the one from which you want receive emails
  //Unseen means you'll only get mails that are unseen
  imap.search([ 'UNSEEN', ['SINCE', 'June 15, 2018'] ], function(err, results) { 
    if (err) throw err;
    var f = imap.fetch(results, { bodies: '' });
    f.on('message', function(msg, seqno) {
      console.log('Message #%d', seqno); 
      var prefix = '(#' + seqno + ') ';
      msg.on('body', function(stream, info) {
        console.log(prefix + 'Body');
        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
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