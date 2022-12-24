import { Router } from "express";
import {User} from '../controllers/UserController.js'
const router = Router()

router.post('/register',async (req,res,next)=>{
    if(req.body.password!==req.body.password2) next(new Error('Passwords do not match!'))
    else{
        const user = new User(
            req.body.email,
            req.body.firstName,
            req.body.lastName)
        const err = await user.register(req.body.password)
        err ? next(new Error(err)) : res.json(user)
    }
})

export default router