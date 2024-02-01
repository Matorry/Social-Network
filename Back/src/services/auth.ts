import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

export type TokenPayload = {
  id: string;
  userName: string;
};

export class Auth {
  private static readonly passwd = process.env.TOKEN_SECRET!;

  static async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static async compare(password: string, hashPasswd: string): Promise<boolean> {
    return bcrypt.compare(password, hashPasswd);
  }

  static signToken(payload: TokenPayload): string {
    return jwt.sign(payload, Auth.passwd);
  }

  static verifyTokenGettingPayload(token: string): TokenPayload {
    return jwt.verify(token, Auth.passwd) as TokenPayload;
  }
}
