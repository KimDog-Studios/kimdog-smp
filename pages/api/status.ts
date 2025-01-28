// filepath: /c:/Users/KimDog/Documents/Development/Websites/kimdog-smp/pages/api/status.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { status } from 'minecraft-server-util';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const javaStatus = await status('play.kimdog-smp.com', 25565); // Java server port
    const bedrockStatus = await status('play.kimdog-smp.com', 19132); // Bedrock server port

    res.status(200).json({ javaStatus, bedrockStatus });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch server status' });
  }
}