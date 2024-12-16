import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
const ALGORITHM = 'HS256';


export const signToken = async (payload: JWTPayload, expiration = '1h'): Promise<string> => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(SECRET_KEY);
  return token;
};


export const verifyToken = async (token: string): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return null;
  }
};
