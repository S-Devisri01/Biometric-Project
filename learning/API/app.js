const express = require('express');
const app = express();
const dotenv= require('dotenv');
const path = require('path')
dotenv.config( {Path : path.join(__dirname,'config','config.env')})
app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
}); 

    
