const express = require('express');
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongooseConfig = require("./config/mongoose");
const cors = require("cors")

const userRoutes = require('./routes/user.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const menuRoutes = require('./routes/menu.routes');
const categoryRoutes = require('./routes/category.routes');
const reviewRoutes = require('./routes/review.routes');
const addressRoutes = require('./routes/address.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const cardDataRoutes = require('./routes/cardData.routes');
const commonUploadRoutes = require('./routes/commonUpload.routes');
const wishListRoutes = require('./routes/wishlist.routes')



app.use(express.static(`${__dirname}/uploads`));
app.use("/uploads", express.static("uploads"));
app.use(cors())




const PORT = process.env.APP_PORT

app.get('/', (req, res) => {
    res.send('HOME PAGE')
    }
);

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/restaurant', restaurantRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/address', addressRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/card' , cardDataRoutes);
app.use('/api/v1/common' , commonUploadRoutes);
app.use('/api/v1/wish' , wishListRoutes)



app.use((req,res, next)=>{
    const error = new Error('Not Found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.json({
        error:{
            message:error.message,
        },
    });
});


app.use((req, res, next) => {
  const allowedOrigins = ["http://192.168.100.127:19000" , 'http://localhost:4200/'];
  // const allowedOrigins = ["https://backend.organiclife.live/"];
 
    const origin = req.headers.origin;
    console.log(origin,"data")
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Origin", ["http://localhost:4200"]);
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

async function dbConnect() {

    try{
        await mongooseConfig.connectToServer();
        console.log("connected to mongo db");
    } catch (error) {
        console.log("error in mongo connection");
    }
    
}

dbConnect();



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});