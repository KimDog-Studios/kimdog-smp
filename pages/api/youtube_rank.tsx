import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, minecraftUsername, uuid, youtubeChannel, subscribers, reason } = req.body;

    if (!name || !email || !minecraftUsername || !uuid || !youtubeChannel || !subscribers || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const webhookUrl = "https://discord.com/api/webhooks/1334665024051875902/5-AqRcr0Q801mYi4JS9vFErjYnv5FQ_YhUhtuCxYTledIWi-t1wFGdmvjXPdY9Y2KrFz";

    if (!webhookUrl) {
      return res.status(500).json({ message: 'Discord webhook URL is not configured' });
    }

    const content = {
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

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error('Failed to send application to Discord');
      }

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