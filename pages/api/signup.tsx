import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.resolve(process.cwd(), 'config', 'users.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Read existing users
    let users = [];
    if (fs.existsSync(filePath)) {
      users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Check if the email or username is already taken
    if (users.some((user: { email: string; username: string }) => user.email === email || user.username === username)) {
      return res.status(400).json({ message: 'Email or username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user
    const newUser = { username, email, password: hashedPassword };
    users.push(newUser);

    // Write the updated users list to the file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}