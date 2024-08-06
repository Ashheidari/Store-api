const Product = require('../models/products');



const getAllProducts = async (req,res)=>{
     const {featured,company,name,sort,fields, numericFilters} = req.query
     const queryObject = {}
     if (featured){
          queryObject.featured =  featured === 'true' ? true : false
     }
     if (company){
          queryObject.company = company
     }
     if (name){
          queryObject.name = {$regex: name, $option:'i'}
     }
     if (numericFilters){
          numericExpression = numericFilters.split(',')
          // [price>30, rating>3]
          operatorMap = {'>':'$gt', '>=':'$gte','=':'$eq', '<':'$lt', '<=':'$lte'}
          const regEx = /\b(<|>|<=|>=|=)\b/g
          const options = ['price','rating']

         const operatorExpression = numericExpression.map((item)=>{
               return item.replace(regEx,(match)=>{
                    return `-${operatorMap[match]}-`
               })
         })
         console.log(operatorExpression)
         for (let expression of operatorExpression){
                 const [field,operator,value] = expression.split('-')
                 if (options.includes(field)){
                      queryObject[field] = {[operator]:Number(value)}        
                 }
         }     
        
         //queryObject : {price : {$gt:10}}
     }
   
  
     let result = Product.find(queryObject)
     if (sort){
          const sortList = sort.split(',').join(' ')
          result =  result.sort(sortList)

     }else {
          result = result.sort('createdAt')
     }
     if (fields){
          const fieldsList = fields.split(',').join(' ')
          result =  result.select(fieldsList)
     }
     const page = Number(req.query.page) || 1
     const limit = Number(req.query.limit) || 10
     const skip = (page-1)*limit
     result = result.limit(limit).skip(skip)

     const products = await result
     res.status(200).json({products,nbHits:products.length})
}



module.exports ={
    getAllProducts,
    getAllProductsStatics
}