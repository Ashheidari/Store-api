require('dotenv').config()
const connectDb = require('./db/connect')
const productJosn = require('./product.json')
const Product = require('./models/products')



const start = async () =>{
    try {
        await connectDb(process.env.MONGO_URL)
        await Product.deleteMany()
        await Product.create(productJosn)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }

}

start()