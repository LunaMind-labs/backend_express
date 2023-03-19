import { type Request, Response } from "express";
import { Comunidadpedido } from "@prisma/client";
import prisma from "../../datasource";


export const pedidosC = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const comunidadpedido = await prisma.comunidadpedido.create({data});
  
      res.status(201).json({
        message: "Pedido Registrado",
        comunidadpedidos:comunidadpedido
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error });
    }
  };
  
