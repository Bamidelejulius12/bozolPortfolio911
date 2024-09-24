const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

const path = require('path');


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle the form submission
app.post('/send', async(req, res) => {
    const { name, email, message } = req.body;

    console.log(req.body)

    // Create a transporter object using the default SMTP transport
    let transporter =  nodemailer.createTransport({
        service: 'gmail', // Use a secure email service provider
        auth: {
            user: 'vicfav123@gmail.com', // Your email
            pass: 'fxwj xgyp gshq yvop' // Your email password or app-specific password
        }
    });



    let mailOptions = {
        from: `"${name}" <${email}>`, // Sender address (includes both name and email)
        to: 'vicfav123@gmail.com', // Receiver's email address
        subject: 'Bozol Contact Form Message', // Subject line
        text: `Message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}` // Plain text body
    };
    

    // Assuming you have already set up the transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
            return res.status(500).json({ message: 'An error occurred while sending the email.' });
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Your message has been sent successfully.' }).redirect('/');
    });

    
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
