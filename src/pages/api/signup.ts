import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import { createUser } from '../../lib/prisma'
import md5 from 'md5'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const username: string = req.body.data.user
  const password: string = md5(req.body.data.password)

  const creationResult = await createUser(username, password)
  if (creationResult !== 'ok') {
    return res.status(500).json(creationResult)
  }

  const token = jwt.sign({ username, password }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '1d',
  })

  const cookies = new Cookies(req, res)

  cookies.set('@ng.cash-jwt', token, {
    httpOnly: true,
    sameSite: 'lax',
  })

  return res.status(201).json({ message: 'account created' })
}
