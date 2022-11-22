import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'
import { verifyJwtValidity } from '../../lib/jwt'
import { makeTransfer } from '../../lib/prisma'
import { extractUsernameFromToken } from './../../lib/jwt'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const usernameDestiny: string = req.body.usernameDestiny
  const value: number = req.body.value

  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed.')
  }

  const cookies = new Cookies(req, res)
  const token = cookies.get('@ng.cash-jwt') ?? ''
  try {
    verifyJwtValidity(token)
  } catch (e) {
    return res.status(401).send('Invalid token.')
  }

  const usernameOrigin = extractUsernameFromToken(token)

  const result = await makeTransfer(usernameOrigin, usernameDestiny, value)
  if (typeof result === 'string') {
    if (result === 'User destiny not found.') {
      return res.status(400).send(result)
    }
    return res.status(500).send(result)
  }

  return res.status(201).json(result)
}
