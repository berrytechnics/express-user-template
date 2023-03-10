import {UserModel} from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
export class User {
    constructor(email,firstName,lastName){
        this.id
        this.email=email
        this.firstName=firstName
        this.lastName=lastName
        this.password
    }
    async register(password){
        const found = await UserModel.findOne({where:{email:this.email}})
        if(found) return {error:'User exists!'}
        this.password = bcrypt.hashSync(password,10)
        const newUser = await UserModel.create(this)
        this.id = newUser.id
        return newUser
    }
    async deregister(password){
        const foundUser = await UserModel.findOne({where:{email:this.email}})
        if(!foundUser) return {error:'User not registered!'}
        else{
            const auth = bcrypt.compareSync(password,this.password)
            if(!auth) return ({error:"Invalid credentials!"})
            else return await foundUser.destroy()
        }
    }
    async update(user){
        for(const [key,val] of Object.entries(user)){
            this[key] = val
        }
        return await UserModel.update(this)
    }
    static async login(email,password){
        const foundUser = await UserModel.findOne({where:{email:email}})
        if(!foundUser) return {error:'User not registered!'}
        else{
            let token
            let auth = bcrypt.compareSync(password,foundUser.password)
            if(!auth) return {error:'Invalid Credentials!'}
            else return {token:jwt.sign({id:foundUser.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRATION})}
        }
    }
    static async find(id){
        UserModel.findOne({where:{id:id}}).then(user=>user).catch(e=>{error:'No user found!'})
    }
    static auth(token){
        const validToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!validToken) return {error:'Invalid or expired token!'}
        else if(new Date(Date.now()+(1000*60*process.env.JWT_REFRESH_MINUTES))>new Date(validToken.exp*1000)) return {new:true,token:jwt.sign({id:validToken.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRATION})}
        else return {token:token}
    }
    static decodeToken(token){
        jwt.verify(token,process.env.JWT_SECRET)
    }
}