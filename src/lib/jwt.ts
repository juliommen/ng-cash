import jwt from 'jsonwebtoken'

const JWT_EXPIRATION = '1d'

export function generateJwt(username: string, password: string) {
  return jwt.sign({ username, password }, process.env.JWT_SECRET_KEY!, {
    expiresIn: JWT_EXPIRATION,
  })
}

export function verifyJwtValidity(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY!)
}

export function extractUsernameFromToken(token: string) {
  const decodedJwt = jwt.decode(token, { complete: true })
  const jwtPayload = decodedJwt!.payload
  return Object.entries(jwtPayload)[0][1]
}
