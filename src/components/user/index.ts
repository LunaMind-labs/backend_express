import { Router } from "express";
import { signup, login, remove, findAll, update} from "./constroller";

const userRouter: Router = Router();

userRouter.get("/", findAll);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.delete("/:idUser", remove);
userRouter.put("/:idUser", update)

export default userRouter;