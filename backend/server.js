import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import data from './data.js';
import dotenv from 'dotenv';
import produtoRouter from './routers/produtoRouter.js';
import userRouter from './routers/userRouter.js';
import pedidoRouter from './routers/PedidoRouter.js';
import addImagemRouter from './routers/addImagemRouter.js';
const PORT = process.env.PORT || 5000;

//const express = require
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://Juliana:111@sitefinal.0hlbv.mongodb.net/siteFinal?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

/*
app.get('/api/produtos/:_id', (req,res) => {
    const produto = data.produtos.find((x) => x._id == req.params.id);
    if(produto){
        res.send(produto);
    }else{
        res.status(404).send({message: 'Produto nao encontrado'});
    }
});
app.get('/api/produtos', (req,res) => {
    res.send(data.produtos);
});*/


app.use('/api/fotos', addImagemRouter);
app.use('/api/users', userRouter);
app.use('/api/produtos', produtoRouter);
app.use('/api/pedidos', pedidoRouter);
app.get('/', (req,res) => {
    res.send('Server esta pronto');
});
const __dirname = path.resolve();
app.use('/fotos', express.static(path.join(__dirname, '/fotos')));

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
})


app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
});