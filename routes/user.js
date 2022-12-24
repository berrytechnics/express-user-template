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
router.post('/login',async (req,res,next)=>{
    const token = await User.login(req.body.email,req.body.password)
    res.json(token)
})
// verify auth on following routes
router.use((req,res,next)=>{
    if(!req.headers||!req.headers.authorization) next(new Error('Missing token!'))
    else{
        const token = User.auth(req.headers.authorization.split(' ')[1])
        if(token.error) next(new Error(token.error))
        else {
            req.headers.authorization=`BEARER ${token}`
            next()
        }
    }
})
router.get('/test',(req,res,next)=>res.sendStatus(200))

export default router