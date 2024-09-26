const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./Routers/userRouter');
const { feeRouter } = require('./Routers/feeRouter');


const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json());


app.use('/user', userRouter);
app.use('/fee', feeRouter)


app.listen(process.env.PORT, async() => {
    try {
        await connection
        console.log('server started at PORT 8080')
    } catch (error) {
        console.log(error)
    }
})
