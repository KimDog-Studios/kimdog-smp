import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import emailConfig from '../../config/emailConfig';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Path to the subscribers.json file
    const filePath = path.resolve(process.cwd(), 'config', 'subscribers.json');

    // Read the existing subscribers
    let subscribers = [];
    if (fs.existsSync(filePath)) {
      subscribers = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Check if the email is already subscribed
    if (subscribers.includes(email)) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    // Add the new email to the subscribers list
    subscribers.push(email);

    // Write the updated subscribers list to the file
    fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport(emailConfig);

    // Email content
    const mailOptions = {
      from: emailConfig.from,
      to: email,
      subject: 'Subscription Confirmation - KimDog SMP',
      text: 'Thank you for subscribing to the KimDog SMP newsletter! Visit us at https://kimdog-smp.com',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-smp/main/public/assets/Logo.png" alt="KimDog SMP Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #333; text-align: center;">Welcome to KimDog SMP!</h2>
          <p style="color: #555;">Thank you for subscribing to the <strong>KimDog SMP</strong> newsletter!</p>
          <p style="color: #555;">We are excited to have you join our community. Stay tuned for the latest updates, events, and news about our Minecraft server.</p>
          <p style="color: #555;">Visit our website: <a href="https://kimdog-smp.com" style="color: #1a73e8;">kimdog-smp.com</a></p>
          <p style="color: #555;">Best regards,<br/>The KimDog SMP Team</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://kimdog-smp.com" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #1a73e8; border-radius: 5px; text-decoration: none;">Visit Our Website</a>
          </div>
        </div>
      `,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Successfully subscribed to the newsletter' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to send confirmation email'});
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}