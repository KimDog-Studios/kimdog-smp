import type { NextApiRequest, NextApiResponse } from 'next';
import { status } from 'minecraft-server-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Fetching server status...');
    const javaStatus = await status('play.kimdog-smp.com', 25565); // Replace with your server address and port
    console.log('Server status fetched:', javaStatus);

    res.status(200).json({ javaStatus });
  } catch (error) {
    console.error('Error fetching server status:', error);
    res.status(500).json({ error: 'Unable to fetch server status' });
  }
}