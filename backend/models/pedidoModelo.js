//import express from 'express';
import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    pedidoItens: [{
        nome: {
            type: String, required: true
        },
        qtde: {
            type: Number, required: true
        },
        imagem: {
            type: String, required: true
        },
        preco: {
            type: Number, required: true
        },
        produto:{type: mongoose.Schema.Types.ObjectId, 
            ref: 'Produto', required: true,
        },

    },],
    enderecoEnvio:{
        nomeCompleto:{type:String, required: true},
        endereco: {type:String, required: true},
        cidade: {type:String, required: true},
        Cep: {type:String, required: true},
        pais: {type:String, required: true},
    },
    metodoPagamento:{type: String, required: true},
    precoItens:{type: Number, required: true},
    precoEnvio:{type: Number, required: true},
    imposto:{type: Number, required: true},
    valorTotal:{type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    estaPago:{type: Boolean, default: false},
    pagoQnd: { type: Date},
    pedidoEnviado:{ type: Boolean, default: false},
    enviadoQnd: {type: Date},

}, {timestamps: true, }
);
const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;