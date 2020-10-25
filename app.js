const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const Cors = require('cors');

const connectDB = require('./config/db')
const API = require('./routes/apiRoutes')

dotenv.config({ path: './config/config.env' })

const app = express();
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
//Database connecting
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(Cors());
app.use(API)




app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server Not Running ${err}`);
    }
    console.log(`Server running in ${process.env.NODE_ENV} on Port:${PORT}`);
})