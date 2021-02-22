import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Produto from '../models/produtosModelo.js';
import {isAuth, isAdmin} from '../utils.js';

const produtoRouter = express.Router();

produtoRouter.get('/', expressAsyncHandler(async (req,res) => {
    const produtos = await Produto.find({});
    res.send(produtos);
}));


produtoRouter.get(
    '/seed', 
    expressAsyncHandler(async(req,res)=>{
    const createdProdutos = await Produto.insertMany(data.produtos);
    res.send({createdProdutos});
}));

produtoRouter.get(
    '/:id', 
    expressAsyncHandler(async(req,res) =>{
    const produto = await Produto.findById(req.params.id);
    if(produto){
        res.send(produto);
    }else{
        res.status(404).send({message: 'Produto nao localizado'});
    }
}));

produtoRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const produto = new Produto({
        nome: 'roupateste' + Date.now(),
        categoria: 'testecat',
        imagem:'/imagens/produto1.jpeg',
        preco: 0,
        qtdStock: 0,
        marca: 'testemarca',
        avaliacao:0,
        numReviews:10,
            
        descricao: 'descricaoteste'
    });
    const criadoProduto= await produto.save();
    res.send({message: 'Produto criado', produto: criadoProduto});
}));

produtoRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const produtoId = req.params.id;

    const produto = await Produto.findById(produtoId);
    if(produto){
        produto.nome = req.body.nome;
        produto.categoria = req.body.categoria;
        produto.imagem = req.body.imagem;
        produto.preco = req.body.preco;
        produto.qtdStock = req.body.qtdStock;
        produto.marca = req.body.marca;
        produto.descricao = req.body.descricao;

        const produtoAtualizado = await produto.save();

        res.send({message:'O produto foi atualizado', produto: produtoAtualizado});
    }else{
        res.status(404).send({message:'Produto nao encontrado'});
    }
}));

produtoRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const produto = await Produto.findById(req.params.id);
    if(produto){
        const deletarProduto = await produto.remove();
        res.send({message:'Produto deletado com sucesso', produto: deletarProduto});
    }
    else{
        res.status(404).send({message: 'Produto nao encontrado'});
    }
}) );

export default produtoRouter;