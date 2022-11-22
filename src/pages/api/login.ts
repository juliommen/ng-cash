import { NextApiRequest, NextApiResponse } from 'next'
import md5 from 'md5'
import Cookies from 'cookies'
import { verifyUserOnDb } from '../../lib/prisma'
import { generateJwt } from '../../lib/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const username: string = req.body.data.username
  const password: string = md5(req.body.data.password)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const verificationResult = await verifyUserOnDb(username, password)
  if (verificationResult !== 'ok') {
    return res.status(500).send(verificationResult)
  }

  const token = generateJwt(username, password)
  const cookies = new Cookies(req, res)
  cookies.set('@ng.cash-jwt', token, {
    httpOnly: true,
    sameSite: 'lax',
  })

  return res.status(201).send('ok')
}
