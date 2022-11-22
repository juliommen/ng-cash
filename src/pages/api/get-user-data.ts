import { NextApiRequest, NextApiResponse } from 'next'
import { getUserData } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const username: string = req.body.username

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { transactions, balance } = await getUserData(username)

  return res.status(201).json({ transactions, balance })
}
