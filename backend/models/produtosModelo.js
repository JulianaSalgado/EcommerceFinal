import mongoose from 'mongoose';

const produtoSchema=new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    imagem:{
        type:String,
        required:true
    },

    preco:{
        type:Number,
        required:true
    },
    qtdStock:{
        type:Number,
        required:true
    },

    marca:{
        type:String,
        required:true
    },
    avaliacao:{
        type:Number,
        required:true,
    },
    numReviews:{
        type:Number,
        required:true
    },

    descricao:{
        type:String,
        required:true
    },

},
    {timetsamps:true}
    
);
const Produto = mongoose.model('Produto', produtoSchema)

export default Produto;