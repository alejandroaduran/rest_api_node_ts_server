import { Request, Response } from "express"


export const createProduct = (res: Response, req: Request) => {
    res.json("desde POST")
    
}