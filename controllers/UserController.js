import {UserModel} from '../models/UserModel.js'
import bcrypt from 'bcryptjs';
class User {
    constructor(email,firstName,lastName){
        this.id
        this.email=email
        this.firstName=firstName
        this.lastName=lastName
        this.password=null
    }
    async register(password){
        const found = await UserModel.findOne({where:{email:this.email}})
        if(found) return 'User exists!'
        this.password = bcrypt.hashSync(password,10)
        const newUser = await UserModel.create(this)
        this.id = newUser.id
        return false
    }
}
export {User}