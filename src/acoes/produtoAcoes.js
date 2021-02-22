import Axios from "axios";
import { PRODUTO_ATUALIZAR_REQUEST, PRODUTO_ATUALIZAR_SUCESSO, PRODUTO_ATUALIZAR_FALHA, PRODUTO_CRIAR_FALHA, PRODUTO_CRIAR_REQUEST, PRODUTO_CRIAR_SUCESSO, PRODUTO_DETALHES_FALHA, PRODUTO_DETALHES_REQUEST, PRODUTO_DETALHES_SUCESSO, PRODUTO_LISTA_FALHA, PRODUTO_LISTA_REQUEST, PRODUTO_LISTA_SUCESSO, PRODUTO_DELETAR_REQUEST, PRODUTO_DELETAR_FALHA, PRODUTO_DELETAR_SUCESSO } from "../constants/produtoConstantes"
 
export const listaProdutos = () => async (dispatch) => {
   dispatch({
       type: PRODUTO_LISTA_REQUEST
   });
   try{
       const{data} = await Axios.get('/api/produtos');
       dispatch({type: PRODUTO_LISTA_SUCESSO, payload: data});
   }catch(error){
       dispatch({type:PRODUTO_LISTA_FALHA, payload: error.message});
   }
};

export const detalhesProduto = (produtoId) => async (dispatch) => {
    dispatch({type: PRODUTO_DETALHES_REQUEST, payload:produtoId});
    try{
        const{data}= await Axios.get(`/api/produtos/${produtoId}`);
        dispatch({type: PRODUTO_DETALHES_SUCESSO, payload:data});
    }catch(error){
        dispatch({type:PRODUTO_DETALHES_FALHA, 
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message : error.message,
        });
    }
};

export const criarProduto = ()=> async(dispatch, getState) =>{
    dispatch({type: PRODUTO_CRIAR_REQUEST});

    const{userLogin:{userInfo},} = getState();

    try{
        const{data} = await Axios.post('/api/produtos', {}, {
            headers:{Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: PRODUTO_CRIAR_SUCESSO, payload: data.produto});

    }catch(error){
        const message= error.response && error.response.data.message 
        ? error.response.data.message : error.message;

        dispatch({type:PRODUTO_CRIAR_FALHA, payload: message});
    }
};

export const produtoAtualizado =(produto) => async(dispatch, getState) =>{
    dispatch({type: PRODUTO_ATUALIZAR_REQUEST, payload: produto});
    const {userLogin:{userInfo}} = getState();

    try{
        const {data} = await Axios.put(`/api/produtos/${produto._id}`, produto, {
            headers:{Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch ({type: PRODUTO_ATUALIZAR_SUCESSO, payload:data});

    }catch(error){
        const message= error.response && error.response.data.message 
        ? error.response.data.message : error.message;

        dispatch ({type: PRODUTO_ATUALIZAR_FALHA, error: message});
    }
};


export const deletarProduto = (produtoId) => async(dispatch, getState)=>{
    dispatch({type: PRODUTO_DELETAR_REQUEST, payload:produtoId});
    const {userLogin:{userInfo},} = getState();

    try{
        const {data} = Axios.delete(`/api/produtos/${produtoId}`, {
            headers:{Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch ({type: PRODUTO_DELETAR_SUCESSO, payload:data});
    }catch (error){
        const message= error.response && error.response.data.message 
        ? error.response.data.message : error.message;
        dispatch ({type: PRODUTO_DELETAR_FALHA, error: message});
    }
};