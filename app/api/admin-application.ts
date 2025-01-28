import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, minecraftUsername, discordName, experience, reason } = req.body;

    const webhookUrl = 'https://discord.com/api/webhooks/1333637803254218752/tK-zbiIe1_yUSsMyeBBnOj2uKZGOJYX0bNeu3pBYQBOFKPUytMAZ1Pj9wQZx0yvx26hI'; // Replace with your Discord webhook URL

    const payload = {
      content: `**New Admin Application**\n\n**Name:** ${name}\n**Email:** ${email}\n**Minecraft Username:** ${minecraftUsername}\n**Discord Name:** ${discordName}\n**Experience:** ${experience}\n**Reason:** ${reason}`,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        res.status(200).json({ message: 'Application sent successfully!' });
      } else {
        res.status(500).json({ message: 'Failed to send application.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to send application.', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}