import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    try {
      // Process the vote (e.g., send to a voting service or database)
      // For demonstration, we'll just log the username
      console.log(`Vote received for username: ${username}`);

      // Respond with a success message
      res.status(200).json({ message: 'Vote submitted successfully' });
    } catch (error) {
      console.error('Error processing vote:', error);
      res.status(500).json({ message: 'Failed to submit vote' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}