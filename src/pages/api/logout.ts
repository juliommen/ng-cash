import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const cookies = new Cookies(req, res)
  cookies.set('@ng.cash-jwt')

  return res.status(201).send('ok')
}
