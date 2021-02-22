import {CARRINHO_ADD_ITEM, CARRINHO_REMOVER_ITEM, CARRINHO_SALVAR_ENDERECO, CARRINHO_SALVAR_PAGAMENTO, CARRINHO_VAZIO} from '../constants/carrinhoConstantes';

export const carrinhoReducer = (state = {itensCarrinho:[] }, action) => {
    switch (action.type){
        case CARRINHO_ADD_ITEM:
            const item = action.payload;
            const itemExiste= state.itensCarrinho.find((x) => x.produto === item.produto);
            if(itemExiste){
                return{
                    ...state,
                    itensCarrinho: state.itensCarrinho.map((x) =>  x.produto === itemExiste.produto? item: x),
                };
            }else{
                return{...state, itensCarrinho: [...state.itensCarrinho, item]};
            }
        case CARRINHO_REMOVER_ITEM:
            return {...state, itensCarrinho: state.itensCarrinho.filter((x)=> x.produto !== action.payload),
            };    
        
        case CARRINHO_SALVAR_ENDERECO:
            return{...state, enderecoEnvio: action.payload};

        case CARRINHO_SALVAR_PAGAMENTO:
            return{...state, metodoPagamento: action.payload};    
        
        case CARRINHO_VAZIO:
            return{...state, itensCarrinho:[]};
        default:
            return state;
    }
};