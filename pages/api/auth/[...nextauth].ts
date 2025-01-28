import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      Providers.Credentials({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
          // Implement your own logic here to find the user and verify the password
          const user = { id: 1, name: 'User', email: 'user@example.com' }; // Replace with your user lookup logic

          if (user) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        },
      }),
    ],
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error',
      verifyRequest: '/auth/verify-request',
      newUser: null, // If set to null, new users will be directed to the signIn page
    },
    session: {
      jwt: true,
    },
    callbacks: {
      async jwt(token, user) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session(session, token) {
        session.user.id = token.id;
        return session;
      },
    },
  });