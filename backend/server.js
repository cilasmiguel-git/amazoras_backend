import express from 'express';
import cors from 'cors';
// import data from './data';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';
import productRoute from './routes/productRoute'
import config from './config';

dotenv.config();

const mongoUrl = config.MONGODB_URL;

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to MongoDB successfully!');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});

const app = express();

app.use(cors());
//estou usando mas o body-parser não é mais nesessario 
app.use(bodyParser.json());//O body-parser ajuda a extrair e analisar esses dados para que você possa acessá-los facilmente no seu aplicativo.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

console.log(userRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// })
// app.get('/api/products/:id', (req, res) => {
//     const productId = req.params.id;
//     console.log('Product ID:', productId);
//     const product = data.products.find(x => x._id === productId);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send('Product Not Found.');
//     }
// });
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection is established.');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});


app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
