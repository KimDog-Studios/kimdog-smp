import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1334732009431634021/EEZj5wGRMUEVDDLBXu0Jx-sMazMAOWWWXM3xpwZ6qyc1wbRs0kGIKXoogf6xk_YSGiFH';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string, 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendDiscordNotification = async (content: any) => {
  const response = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send application to Discord: ${errorText}`);
  }
};

const sendEmail = async (email: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  };

  console.log('Sending email with options:', mailOptions);

  await transporter.sendMail(mailOptions);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { type, name, email, minecraftUsername, uuid, discordName, youtubeChannel, subscribers, experience, reason, message } = req.body;

  console.log('Request body:', req.body);

  if (!type || !name || !email || !reason) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  let content: any = '';
  let subject = '';
  let emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-smp/main/public/assets/Logo.png" alt="KimDog SMP Logo" style="max-width: 150px;">
      </div>
      <h2 style="color: #333; text-align: center;">Thank you for applying to KimDog SMP!</h2>
      <p style="color: #555;">Hello ${name},</p>
      <p style="color: #555;">Thank you for applying for the <strong>${type}</strong> position on our server. We have received your application and will review it within 24-48 hours.</p>
      <p style="color: #555;">Visit our website: <a href="https://kimdog-smp.com" style="color: #1a73e8;">kimdog-smp.com</a></p>
      <p style="color: #555;">Best regards,<br/>The KimDog SMP Team</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://kimdog-smp.com" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #1a73e8; border-radius: 5px; text-decoration: none;">Visit Our Website</a>
      </div>
    </div>
  `;

  switch (type) {
    case 'whitelist':
      if (!minecraftUsername || !uuid || !discordName) {
        return res.status(400).json({ message: 'Required fields are missing for whitelist application' });
      }
      content = {
        content: `**New Whitelist Application**\n\n**Name:** ${name}\n**Email:** ${email}\n**Minecraft Username:** ${minecraftUsername}\n**UUID:** ${uuid}\n**Discord Name:** ${discordName}\n**Reason:** ${reason}`,
      };
      subject = 'Whitelist Application Received';
      break;
    case 'admin':
      if (!minecraftUsername || !discordName || !experience) {
        return res.status(400).json({ message: 'Required fields are missing for admin application' });
      }
      content = {
        content: `**New Admin Application**\n\n**Name:** ${name}\n**Email:** ${email}\n**Minecraft Username:** ${minecraftUsername}\n**Discord Name:** ${discordName}\n**Experience:** ${experience}\n**Reason:** ${reason}`,
      };
      subject = 'Admin Application Received';
      break;
    case 'youtube_rank':
      if (!minecraftUsername || !uuid || !youtubeChannel || !subscribers) {
        return res.status(400).json({ message: 'Required fields are missing for YouTube rank application' });
      }
      content = {
        username: 'Application Bot',
        embeds: [
          {
            title: 'YouTube Rank Application',
            fields: [
              { name: 'Name', value: name, inline: true },
              { name: 'Email', value: email, inline: true },
              { name: 'Minecraft Username', value: minecraftUsername, inline: true },
              { name: 'UUID', value: uuid, inline: true },
              { name: 'YouTube Channel', value: youtubeChannel, inline: true },
              { name: 'Subscribers', value: subscribers, inline: true },
              { name: 'Reason', value: reason, inline: false },
            ],
            timestamp: new Date(),
          },
        ],
      };
      subject = 'YouTube Rank Application Received';
      break;
    case 'contact':
      if (!message) {
        return res.status(400).json({ message: 'Message is required for contact form' });
      }
      content = {
        content: `**New Contact Form Submission**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`,
      };
      subject = `Contact form submission from ${name}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-smp/main/public/assets/Logo.png" alt="KimDog SMP Logo" style="max-width: 150px;">
          </div>
          <h2 style="color: #333; text-align: center;">Thank you for contacting KimDog SMP!</h2>
          <p style="color: #555;">Hello ${name},</p>
          <p style="color: #555;">Thank you for reaching out to us. We have received your message and will get back to you within 24-48 hours.</p>
          <p style="color: #555;">Best regards,<br/>The KimDog SMP Team</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://kimdog-smp.com" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #1a73e8; border-radius: 5px; text-decoration: none;">Visit Our Website</a>
          </div>
        </div>
      `;
      break;
    default:
      return res.status(400).json({ message: 'Invalid application type' });
  }

  try {
    if (type !== 'contact') {
      console.log('Sending Discord notification with content:', content);
      await sendDiscordNotification(content);
    }

    console.log('Sending email to:', email);
    await sendEmail(email, subject, emailHtml);

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Failed to submit application'});
  }
}