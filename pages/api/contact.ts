import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    console.log('Received request:', { name, email, message });

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing environment variables for email configuration');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    console.log('Environment variables:', {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS ? '******' : 'not set',
    });

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configure the email options
    const mailOptions = {
      from: email,
      to: 'kim.dog.543@gmail.com',
      subject: `Contact form submission from ${name}`,
      text: message,
    };

    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error});
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}