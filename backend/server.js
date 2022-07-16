require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")

const appointRoutes = require('./routes/appoints')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/users')

const app = express()

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Router
app.use('/api/appoints', appointRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// Connect to mongoDB and Listen port
mongoose.connect(process.env.MONG_LOCAL)
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log("Connected to mongoDB and Listening on port 4000");
    })
})
.catch(err=>{console.log(err)})



