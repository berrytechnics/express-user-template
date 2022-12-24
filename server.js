import express from 'express'
import {sequelizeConnection as sequelize} from './database.js'
import indexRouter from './routes/index.js'
import userRouter from './routes/user.js'
const app = express()
app.use(express.json())
app.use('/',indexRouter)
app.use('/user',userRouter)
app.use((err,req,res,next)=>{
    err ? res.send(err.stack) : res.send({error:'An unknown error occurred!'})
})
app.listen(process.env.PORT,async()=>{
    try{
        await sequelize.sync({force:true})
        console.info(`Server listening on ${process.env.PORT}`)    
    }
    catch(e){
        console.error(e)
        process.exit(1)
    }
})