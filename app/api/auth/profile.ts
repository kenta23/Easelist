// pages/api/profile.js
import { authOptions } from "@/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = session.user;

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
