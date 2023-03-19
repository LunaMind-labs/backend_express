import jwt from "jsonwebtoken";
import { Request } from "express";

export function verify_authentication(req: Request, secret_key: string): boolean {

  const usertoken: string = req.headers.authorization || '';
  let is_verified = true;
  
  jwt.verify(usertoken, secret_key, (err, payload) => {
    if(err){
      is_verified = false;
    }
  })

  return is_verified
}