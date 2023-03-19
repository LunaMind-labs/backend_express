import { Router } from "express";
import { signup, login} from "./controller";

const orgaRouter: Router = Router();


orgaRouter.post("/signup", signup);
orgaRouter.post("/login", login);


export default orgaRouter;