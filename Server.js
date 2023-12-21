const app =require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
 
//Handling Uncaught Exception

process.on("uncaughtException",(err)=>{
  console.log(`Error :${err.message}`)
  console.log(`shutting down the server due to uncaught exception`)
  process.exit(1)
})





//Config
dotenv.config({path:"Backend/config/config.env"})


//connecting to database
connectDatabase()



const server = app.listen(process.env.PORT,()=>{

  console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Unhandled promise rejection
 process.on("unhandledRejection",(err)=>{

  console.log(`Error: ${err.message}`)
  console.log(`shutting down the server due to unhandled promise rejection `)
     
  server.close(()=>{
    process.exit(1)
  })

 })

