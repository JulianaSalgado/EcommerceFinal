import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Pedido from '../models/pedidoModelo.js';
import { isAdmin, isAuth } from '../utils.js';

const pedidoRouter = express.Router();

pedidoRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const pedidos = await Pedido.find({}).populate('user', 'nome');

    res.send(pedidos);
}));

pedidoRouter.get('/meu', isAuth, expressAsyncHandler(async(req,res)=> {
    const pedidos = await Pedido.find({user: req.user._id});

    res.send(pedidos);
}));

pedidoRouter.post('/', isAuth ,expressAsyncHandler(async(req,res)=>{
    if(req.body.pedidoItens.length === 0){
        res.status(400).send({message: 'O carrinho está vazio'});
    }else{
        const pedido = new Pedido({
            pedidoItens: req.body.pedidoItens,
            enderecoEnvio: req.body.enderecoEnvio,
            metodoPagamento: req.body.metodoPagamento,
            precoItens: req.body.precoItens,
            precoEnvio: req.body.precoEnvio,
            imposto: req.body.imposto,
            valorTotal: req.body.valorTotal,
            user: req.user._id,
        });
        const createdPedido = await pedido.save();

        res.status(201).send({message: 'O pedido foi criado', pedido: createdPedido});
    }
}));

pedidoRouter.get('/:id', isAuth, expressAsyncHandler(async(req,res)=>{
    const pedidos = await Pedido.findById(req.params.id);

    if(pedidos){
        res.send(pedidos);
    }else{
        res.status(404).send({message: 'Pedido nao encontrado'});
    }
}));

pedidoRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
    const pedido = await Pedido.findById(req.params.id);

    if(pedido){
        const deletarPedido = await pedido.remove();
        res.send({message: 'Pedido deletado com sucesso', pedido:deletarPedido});
    }
    else{
        res.status(404).send({message: 'Pedido nao encontrado'})
    }

}));

//rever isso

pedidoRouter.put('/:id/enviar', isAuth, expressAsyncHandler(async (req,res)=>{
    const pedido = await Pedido.findById(req.params.id);

    if(pedido){
        pedido.pedidoEnviado=true;
        pedido.enviadoQnd = Date.now();
        const atualizarPedido = await pedido.save();
        res.send({message:'Pedido enviado', pedido:atualizarPedido});
    }
    else{
        res.status(404).send({message: 'Pedido nao encontrado'});
    }
    })
);

export default pedidoRouter;