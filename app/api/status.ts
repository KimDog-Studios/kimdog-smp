import type { NextApiRequest, NextApiResponse } from 'next';
import { status } from 'minecraft-server-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Fetching Java server status...');
    const javaStatus = await status('play.kimdog-smp.com', 25565); // Java server port
    console.log('Java server status fetched:', javaStatus);

    console.log('Fetching Bedrock server status...');
    const bedrockStatus = await status('play.kimdog-smp.com', 19132); // Bedrock server port
    console.log('Bedrock server status fetched:', bedrockStatus);

    res.status(200).json({ javaStatus, bedrockStatus });
  } catch (error) {
    console.error('Error fetching server status:', error);
    res.status(500).json({ error: 'Unable to fetch server status', details: error.message });
  }
}