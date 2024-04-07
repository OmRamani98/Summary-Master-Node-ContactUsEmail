const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omramani98@gmail.com',
    pass: 'wvuzwysgegqvlufq'
  }
});

app.post('/send-email', (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    from: 'omramani98@gmail.com',
    to: 'omramani98@gmail.com',
    subject: 'New contact form submission',
    text: `Email: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
