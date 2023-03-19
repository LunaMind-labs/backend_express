import { Router } from "express";
import { pedidosC } from "./controller";

const comunidadRouter: Router = Router();


comunidadRouter.post("/pedidosC", pedidosC);

export default comunidadRouter;