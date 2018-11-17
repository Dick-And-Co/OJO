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

percent = 50
console.log(percent)
//maybe send email 
if(percent == 50) {
console.log('sent Email')
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ojotester@gmail.com',
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
	from: 'ojotester@gmail.com', // sender address
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
