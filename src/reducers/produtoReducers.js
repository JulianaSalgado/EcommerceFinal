const {
    PRODUTO_LISTA_FALHA,
    PRODUTO_LISTA_REQUEST,
    PRODUTO_LISTA_SUCESSO,
    PRODUTO_DETALHES_REQUEST,
    PRODUTO_DETALHES_FALHA,
    PRODUTO_DETALHES_SUCESSO,
    PRODUTO_CRIAR_REQUEST,
    PRODUTO_CRIAR_FALHA,
    PRODUTO_CRIAR_SUCESSO,
    PRODUTO_CRIAR_RESET,
    PRODUTO_ATUALIZAR_REQUEST,
    PRODUTO_ATUALIZAR_SUCESSO,
    PRODUTO_ATUALIZAR_FALHA,
    PRODUTO_ATUALIZAR_RESET,
    PRODUTO_DELETAR_REQUEST,
    PRODUTO_DELETAR_SUCESSO,
    PRODUTO_DELETAR_FALHA,
    PRODUTO_DELETAR_RESET,
 } = require('../constants/produtoConstantes');
  
 export const produtoListaReducer = (state={loading: true, produtos: [] }, action) => {
    switch(action.type){
        case PRODUTO_LISTA_REQUEST:
            return {loading: true};
        case PRODUTO_LISTA_SUCESSO:
            return {loading: false, produtos: action.payload};
        case PRODUTO_LISTA_FALHA:
            return {loading:false, error:action.payload}      
        default:
            return state;   
    }
 };

 export const produtoDetalhesReducer = (state = {loading:true}, action) =>{
     switch(action.type){
         case PRODUTO_DETALHES_REQUEST:
             return {loading:true};
        case PRODUTO_DETALHES_SUCESSO:
            return {loading:false, produto: action.payload};
        case PRODUTO_DETALHES_FALHA:
            return{loading: false, error: action.payload};
        default:
            return state;            
     }
 };
 
 export const criarProdutoReducer = (state={}, action) =>{
     switch(action.type){
        case PRODUTO_CRIAR_REQUEST:
            return {loading:true};
    
        case PRODUTO_CRIAR_SUCESSO:
            return {loading: false, success:true, produto:action.payload};

        case PRODUTO_CRIAR_FALHA:
            return{loading: false, error: action.payload};

        case PRODUTO_CRIAR_RESET:
            return {};

        default:
            return state;
     }
 };

 export const atualizacaoProdutoReducer = (state={}, action)=>{
     switch(action.type){
         case PRODUTO_ATUALIZAR_REQUEST:
             return {loading: true};

        case PRODUTO_ATUALIZAR_SUCESSO:
            return {loading: false, success: true};

        case PRODUTO_ATUALIZAR_FALHA:
            return {loading: false, error: action.payload};

        case PRODUTO_ATUALIZAR_RESET:
            return {};

        default: return state;

     }
 };

 export const deletarProdutoReducer =(state={}, action)=>{
     switch(action.type){
         case PRODUTO_DELETAR_REQUEST:
             return {loading:true};

        case PRODUTO_DELETAR_SUCESSO:
            return{loading:false, success:true};

        case PRODUTO_DELETAR_FALHA:
            return{loading:false, error:action.payload};

        case PRODUTO_DELETAR_RESET:
            return{};

        default: return state;
     }
 };