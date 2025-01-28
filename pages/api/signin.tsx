import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const filePath = path.resolve(process.cwd(), 'config', 'users.json');
const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Read existing users
    let users = [];
    if (fs.existsSync(filePath)) {
      users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Find the user by email or username
    const user = users.find(user => user.email === identifier || user.username === identifier);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, secret, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}