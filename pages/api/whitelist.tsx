import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, minecraftUsername, uuid, discordName, reason } = req.body;

    if (!name || !email || !minecraftUsername || !uuid || !discordName || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const webhookUrl = 'https://discord.com/api/webhooks/1333635771281707079/oqdT2uy9cEkFYbXLOlTZ1c-oDTYNEB6TDPuDwpHJKAopvvfhFo5OxtrOxpC1pzD1-M_J'; // Replace with your Discord webhook URL

    const payload = {
      content: `**New Whitelist Application**\n\n**Name:** ${name}\n**Email:** ${email}\n**Minecraft Username:** ${minecraftUsername}\n**UUID:** ${uuid}\n**Discord Name:** ${discordName}\n**Reason:** ${reason}`,
    };

    try {
      // Send application to Discord
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send application to Discord');
      }

      // Send confirmation email to the applicant
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Whitelist Application Received',
        text: `Hello ${name},\n\nThank you for applying for the whitelist on our server. We have received your application and will review it within 24-48 hours.\n\nBest regards,\nKimDog SMP Team`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}