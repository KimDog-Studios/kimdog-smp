import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Your email to receive applications

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an application notification to Discord.
 */
const sendDiscordNotification = async (application: any) => {
  if (!DISCORD_WEBHOOK_URL) throw new Error('DISCORD_WEBHOOK_URL is missing.');

  const embed = {
    embeds: [
      {
        title: '📩 New Application Received',
        color: 0x1a73e8,
        fields: [
          { name: '**👤 Name**', value: application.name, inline: true },
          { name: '**📧 Email**', value: application.email, inline: true },
          { name: '**🎮 Minecraft Username**', value: application.minecraftUsername, inline: true },
          { name: '**🆔 UUID**', value: `\`${application.uuid}\``, inline: false },
          { name: '**🗣️ Discord Name**', value: application.discordName, inline: true },
          { name: '**📌 Application Type**', value: application.type, inline: true },
          { name: '**📝 Reason for Joining**', value: application.reason, inline: false },
        ],
        footer: {
          text: 'KimDog SMP Applications',
          icon_url: 'https://raw.githubusercontent.com/KimDog-Studios/kimdog-smp/main/public/assets/Logo.png',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const response = await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(embed),
  });

  if (!response.ok) {
    throw new Error(`Failed to send Discord notification: ${await response.text()}`);
  }
};

/**
 * Generates the email content for confirmation (Sent to User).
 */
const generateUserEmailHtml = (name: string, type: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <div style="text-align: center;">
      <img src="https://raw.githubusercontent.com/KimDog-Studios/kimdog-smp/main/public/assets/Logo.png" alt="KimDog SMP Logo" style="max-width: 150px;">
    </div>
    <h2 style="color: #333; text-align: center;">${
      type === 'subscribe' ? 'Subscription Confirmation' : 'Application Received'
    }</h2>
    <p>Hello ${name},</p>
    <p>Thank you for ${type === 'subscribe' ? 'subscribing to' : 'applying for'} the KimDog SMP! We will review your request and contact you soon.</p>
    <p>Visit our website: <a href="https://kimdog-smp.com" style="color: #1a73e8;">kimdog-smp.com</a></p>
    <p>Best regards,<br/>The KimDog SMP Team</p>
  </div>
`;

/**
 * Generates the email content for admin (Sent to You).
 */
const generateAdminEmailHtml = (application: any) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #1a73e8; text-align: center;">📩 New Application Received</h2>
    <p><strong>👤 Name:</strong> ${application.name}</p>
    <p><strong>📧 Email:</strong> ${application.email}</p>
    <p><strong>🎮 Minecraft Username:</strong> ${application.minecraftUsername}</p>
    <p><strong>🆔 UUID:</strong> ${application.uuid}</p>
    <p><strong>🗣️ Discord Name:</strong> ${application.discordName}</p>
    <p><strong>📌 Application Type:</strong> ${application.type}</p>
    <p><strong>📝 Reason for Joining:</strong> ${application.reason}</p>
    <hr/>
    <p style="text-align: center;"><em>This is an automated email. Do not reply.</em></p>
  </div>
`;

/**
 * Sends an email.
 */
const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  console.log(`[📧] Sending email to: ${to}`);
  await transporter.sendMail(mailOptions);
};

/**
 * API Route Handler
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, minecraftUsername, uuid, discordName, reason, type } = req.body;

  if (!name || !email || !minecraftUsername || !uuid || !discordName || !reason || !type) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    console.log(`[✅] New application from ${name}`);

    // Send Discord Notification
    await sendDiscordNotification({ name, email, minecraftUsername, uuid, discordName, reason, type });

    // Send User Confirmation Email
    const userEmailHtml = generateUserEmailHtml(name, type);
    await sendEmail(email, 'Application Received', userEmailHtml);

    // Send Admin Notification Email
    if (!ADMIN_EMAIL) {
      throw new Error('ADMIN_EMAIL is not defined.');
    }
    const adminEmailHtml = generateAdminEmailHtml({ name, email, minecraftUsername, uuid, discordName, reason, type });
    await sendEmail(ADMIN_EMAIL, 'New Application Received', adminEmailHtml);

    res.status(200).json({ message: 'Application submitted successfully.' });
  } catch (error: any) {
    console.error('[❌] Error processing application:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
