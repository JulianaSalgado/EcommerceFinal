import { 
    PEDIDOS_ADM_DELETAR_FALHA,
    PEDIDOS_ADM_DELETAR_REQUEST,
    PEDIDOS_ADM_DELETAR_SUCESSO,
    PEDIDOS_ADM_DELETAR_RESET,
    PEDIDOS_ADM_FALHA,
    PEDIDOS_ADM_REQUEST,
    PEDIDOS_ADM_SUCESSO,
    PEDIDOS_HISTORICO_FALHA,
    PEDIDOS_HISTORICO_REQUEST,
    PEDIDOS_HISTORICO_SUCESSO,
    PEDIDO_CRIAR_FALHA, 
    PEDIDO_CRIAR_REQUEST, 
    PEDIDO_CRIAR_RESET, 
    PEDIDO_CRIAR_SUCESSO,
    PEDIDO_DETALHES_FALHA,
    PEDIDO_DETALHES_REQUEST,
    PEDIDO_DETALHES_SUCESSO,
    PEDIDO_ENVIAR_REQUEST,
    PEDIDO_ENVIAR_SUCESSO,
    PEDIDO_ENVIAR_FALHA,
    PEDIDO_ENVIAR_RESET, } from "../constants/pedidoConstantes";

export const pedidoCriadoReducer = (state = {}, action) => {
    switch(action.type){
        case PEDIDO_CRIAR_REQUEST:
            return{loading: true};
        case PEDIDO_CRIAR_SUCESSO:
            return {loading: false, success: true, pedido: action.payload}; //funciona com pedido ou com order?
        case PEDIDO_CRIAR_FALHA:
            return {loading: false, error: action.payload};     
        case PEDIDO_CRIAR_RESET:
            return {};      

        default: 
            return state;
    }
};

export const pedidoDetalhesReducer = (state= {loading:true, pedido:{}}, action) =>{
    switch(action.type){
        case PEDIDO_DETALHES_REQUEST:
            return {loading: true};

        case PEDIDO_DETALHES_SUCESSO:
            return {loading: false, pedido: action.payload};
        
        case PEDIDO_DETALHES_FALHA:
            return {loading: false, error: action.payload}; 
        default:
            return state;
    }
};

export const listaHistPedidoReducer = (state = {pedidos:[]}, action) =>{
    switch(action.type){
        case PEDIDOS_HISTORICO_REQUEST:
            return {loading: true};
        case PEDIDOS_HISTORICO_SUCESSO:
            return {loading: false, pedidos:action.payload };
        case PEDIDOS_HISTORICO_FALHA:
            return {loading: false, error:action.payload};    

        default: return state;    
    }
};

export const listaPedidosAdmReducer = (state = {pedidos:[]}, action) =>{
    switch(action.type){
        case PEDIDOS_ADM_REQUEST:
            return {loading: true};
        case PEDIDOS_ADM_SUCESSO:
            return {loading: false, pedidos:action.payload };
        case PEDIDOS_ADM_FALHA:
            return {loading: false, error:action.payload};    

        default: return state;    
    }
};

export const deletarPedidoReducer = (state = {}, action) =>{
    switch(action.type){
        case PEDIDOS_ADM_DELETAR_REQUEST:
            return {loading: true};
        case PEDIDOS_ADM_DELETAR_SUCESSO:
            return {loading: false, success: true };
        case PEDIDOS_ADM_DELETAR_FALHA:
            return {loading: false, error:action.payload};  
        case PEDIDOS_ADM_DELETAR_RESET:
            return{};

        default: return state;    
    }
};
//rever isso
export const enviarPedidoReducer = (state={}, action)=>{
    switch(action.type){
        case PEDIDO_ENVIAR_REQUEST:
            return{loading:true};
        case PEDIDO_ENVIAR_SUCESSO:
            return{loading:false, success: true};
        case PEDIDO_ENVIAR_FALHA:
            return{payload: false, error: action.payload};
        case PEDIDO_ENVIAR_RESET:
            return {};

        default: return state;
    }
};
