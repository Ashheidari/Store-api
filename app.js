require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDb = require('./db/connect');
const productsRouter = require('./routes/products');
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL


// middleware 

app.use(express.json())
app.get('/',(re,res)=>{
    res.send('<h1>Store API</h1> <a href="/api/v1/products">products route</a>')
})

//routes
app.use('/api/v1/products', productsRouter)




app.use(errorHandlerMiddleware)


const start = async () =>{
    try {
       await connectDb(MONGO_URL)
       app.listen(PORT, console.log(`Server is running on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
  
}

start()