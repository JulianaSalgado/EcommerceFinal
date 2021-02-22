import Axios from 'axios';
import { CARRINHO_VAZIO } from '../constants/carrinhoConstantes';
import { PEDIDO_ENVIAR_REQUEST, PEDIDO_ENVIAR_SUCESSO, PEDIDO_ENVIAR_FALHA, PEDIDOS_ADM_DELETAR_REQUEST, PEDIDOS_ADM_DELETAR_FALHA, PEDIDOS_ADM_DELETAR_SUCESSO, PEDIDOS_ADM_REQUEST, PEDIDOS_ADM_FALHA, PEDIDOS_ADM_SUCESSO, PEDIDOS_HISTORICO_FALHA, PEDIDOS_HISTORICO_REQUEST, PEDIDOS_HISTORICO_SUCESSO, PEDIDO_CRIAR_FALHA, PEDIDO_CRIAR_REQUEST, PEDIDO_CRIAR_SUCESSO, PEDIDO_DETALHES_FALHA, PEDIDO_DETALHES_REQUEST, PEDIDO_DETALHES_SUCESSO} from "../constants/pedidoConstantes"

export const criarPedido = (pedido) => async (dispatch, getState) => {
    dispatch({type: PEDIDO_CRIAR_REQUEST, payload: pedido});
    try{
        const {
            userLogin:{userInfo},
        } = getState();
        const {data} = await Axios.post('/api/pedidos', pedido, {
            headers: {
               Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: PEDIDO_CRIAR_SUCESSO, payload: data.pedido});
        dispatch({type: CARRINHO_VAZIO});
        localStorage.removeItem('itensCarrinho');
    }catch(error){
        dispatch({type: PEDIDO_CRIAR_FALHA, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};
export const detalhesPedido = (pedidoId) => async (dispatch, getState) => {
    dispatch ({type: PEDIDO_DETALHES_REQUEST, payload: pedidoId});
    
    const {userLogin: {userInfo}} = getState();

    try{
        const {data} = await Axios.get(`/api/pedidos/${pedidoId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({type: PEDIDO_DETALHES_SUCESSO, payload: data});

    } catch(error){
        const message= error.response && error.response.data.message 
            ? error.response.data.message : error.message;
        
        dispatch({type: PEDIDO_DETALHES_FALHA, payload: message});
    }
};

export const listaHistoricoPedidos = () => async (dispatch, getState) => {
    dispatch({type: PEDIDOS_HISTORICO_REQUEST});

    const {userLogin: {userInfo}} = getState();

    try{
        const {data} = await Axios.get('/api/pedidos/meu', {
            headers:{ Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({type: PEDIDOS_HISTORICO_SUCESSO, payload: data});

    }catch(error){
        const message= error.response && error.response.data.message 
            ? error.response.data.message : error.message;
        dispatch({type: PEDIDOS_HISTORICO_FALHA, payload: message});
    }
};

export const listaPedidosAdm = () => async(dispatch, getState) => {
    dispatch ({type: PEDIDOS_ADM_REQUEST});

    const {userLogin: {userInfo},} = getState();

    try{
        const {data} = await Axios.get('/api/pedidos', {
            headers:{ Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data);
        dispatch({type: PEDIDOS_ADM_SUCESSO, payload:data});

    }catch(error){
        const message= error.response && error.response.data.message 
            ? error.response.data.message : error.message;

        dispatch({type: PEDIDOS_ADM_FALHA, payload: message});
    }
};

export const deletarPedido = (pedidoId) => async(dispatch, getState) =>{
    dispatch({type: PEDIDOS_ADM_DELETAR_REQUEST, payload: pedidoId});
    const {userLogin: {userInfo},} = getState();

    try{
        const {data} = Axios.delete(`/api/pedidos/${pedidoId}`, {
            headers:{ Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({type: PEDIDOS_ADM_DELETAR_SUCESSO, payload:data});
        
    }catch(error){
        const message= error.response && error.response.data.message 
            ? error.response.data.message : error.message;

        dispatch({type: PEDIDOS_ADM_DELETAR_FALHA, payload:message });
    }
};

//rever isso

export const enviarPedido = (pedidoId) => async(dispatch, getState)=>{
    dispatch({type: PEDIDO_ENVIAR_REQUEST, payload: pedidoId});
    const{ userLogin:{userInfo},}=getState;

    try{
        const {data} = Axios.put(`/api/pedidos/${pedidoId}/enviar`, {}, {
            headers:{ Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({type: PEDIDO_ENVIAR_SUCESSO, payload: data});
    }catch(error){
        const message= error.response && error.response.data.message 
            ? error.response.data.message : error.message;

            dispatch({type: PEDIDO_ENVIAR_FALHA, payload:message });
    }
};