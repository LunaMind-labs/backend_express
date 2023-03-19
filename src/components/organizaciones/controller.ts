import type { Request, Response } from "express";
import { Orga } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../datasource";
import { verify_authentication } from "../authenticate";

const secret_key = process.env.SECRET_KEY || 'Alguna llave secreta';



export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      data.last_session = data.last_session || null;
  
      const encrypted_password = await bcrypt.hash(data.password, 10);
      
      const new_orga = {
        name: data.name,
        description: data.description,
        work_area: data.work_area,
        web_page: data.web_page,
        ruc: data.ruc,
        email: data.email,
        contact_name: data.contact_name,
        contact_number: data.contact_number,
        city: data.city,
        location: data.location,
        business_name:data.business_name,
        password: encrypted_password,
        last_session: new Date(data.last_session),
      }

      const orga = await prisma.orga.create({ data: new_orga });
  
      const token = jwt.sign({id: orga.id, email: orga.email}, secret_key, {
        expiresIn: 86400
      });
  
      res.status(201).json({ ok: true, message: "organization created successfully", data: orga, token: token });
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ ok: false, message: error });
    }
  };


  export const login = async (req:Request, res: Response): Promise<void> => {
    try{
      const { email, password } = req.body
      const orga: Orga | null = await prisma.orga.findUnique({ where: {email: email}})
      if (orga == null){
        res.status(400).json({ok: false, message: "Incorrect email"})
      } else {
        const is_valid = await bcrypt.compare(password, orga.password)
  
        if(is_valid){
          const token = jwt.sign({id: orga.id, email: orga.email}, secret_key, {
            expiresIn: 86400
          });
  
          res.status(201).json({ ok: true, message: "Login succesful", data: orga, token: token });
  
        } else {
          res.status(400).json({ok: false, message: "Incorrect password"})
        }
      }
    } catch (error){
      res.status(500).json({ ok: false, message: error });
    }
  };


  export const findAll = async (req: Request, res: Response): Promise<void> => {
    try {
  
      if(verify_authentication(req, secret_key)){
  
        const orgas = await prisma.orga.findMany();
  
        res.status(200).json({
          ok: true,
          data: orgas,
        });
      } else {
        res.status(400).json({ok: false, message: 'Authentication failed'});
      }
  
    } catch (error) {
      res.status(500).json({ ok: false, message: error });
    }
  };