import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, name, email, minecraftUsername, uuid, discordName, experience, reason } = req.body;

    let content = '';
    if (type === 'whitelist') {
      content = `**New Whitelist Application**\n\n**Name:** ${name}\n**Email:** ${email}\n**Minecraft Username:** ${minecraftUsername}\n**UUID:** ${uuid}\n**Discord Name:** ${discordName}\n**Reason:** ${reason}`;
    } else if (type === 'admin') {
      content = `**New Admin Application**\n\n**Name:** ${name}\n**Email:** ${email}\n**Minecraft Username:** ${minecraftUsername}\n**Discord Name:** ${discordName}\n**Experience:** ${experience}\n**Reason:** ${reason}`;
    } else {
      return res.status(400).json({ message: 'Invalid application type' });
    }

    const webhookUrl = 'https://discord.com/api/webhooks/1333635771281707079/oqdT2uy9cEkFYbXLOlTZ1c-oDTYNEB6TDPuDwpHJKAopvvfhFo5OxtrOxpC1pzD1-M_J'; // Replace with your Discord webhook URL

    const payload = { content };

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
      res.status(500).json({ message: 'Failed to send application.'});
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}