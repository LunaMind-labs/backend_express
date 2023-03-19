import { userRouter, orgaRouter, comunidadRouter } from "../components";

const routes = [
    ["users", userRouter],
    ["organizaciones", orgaRouter],
    ["comunidades", comunidadRouter]

]

export const router = (app:any) => {
    routes.forEach(([path, controller]) => 
    app.use(`/api/v1/${path}`, controller))
    ;
};