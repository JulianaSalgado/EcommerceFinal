import Axios from "axios";
import { CARRINHO_ADD_ITEM, CARRINHO_REMOVER_ITEM, CARRINHO_SALVAR_ENDERECO, CARRINHO_SALVAR_PAGAMENTO } from "../constants/carrinhoConstantes";

export const addAoCarrinho = (produtoId, qtde) => async(dispatch, getState) =>{
    const{data} = await Axios.get(`/api/produtos/${produtoId}`);
    dispatch({
        type: CARRINHO_ADD_ITEM, payload:{
            nome: data.nome,
            imagem: data.imagem,
            preco: data.preco,
            qtdStock: data.qtdStock,
            produto: data._id,
            qtde,

        },
    });
    localStorage.setItem('itensCarrinho', JSON.stringify(getState().carrinho.itensCarrinho));
}

export const removerItemCarrinho = (produtoId) => (dispatch, getState) => {
    dispatch({type:CARRINHO_REMOVER_ITEM, payload:produtoId});

    localStorage.setItem('itensCarrinho', JSON.stringify(getState().carrinho.itensCarrinho));
};
export const salvarEndereco = (data) => (dispatch) => {
    dispatch({type: CARRINHO_SALVAR_ENDERECO, payload: data});
    localStorage.setItem('enderecoEnvio', JSON.stringify(data));
};

export const salvarPagamento = (data) => (dispatch) => {
    dispatch({type: CARRINHO_SALVAR_PAGAMENTO, payload: data});
;}