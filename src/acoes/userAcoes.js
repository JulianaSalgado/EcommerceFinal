import Axios from "axios";
import { USUARIO_ATUALIZAR_ADM_REQUEST, USUARIO_ATUALIZAR_ADM_SUCESSO, USUARIO_ATUALIZAR_ADM_FALHA, USUARIO_ATUALIZAR_ADM_RESET, DELETAR_USUARIO_REQUEST, DELETAR_USUARIO_SUCESSO, DELETAR_USUARIO_FALHA, USUARIO_LISTA_REQUEST, USUARIO_LISTA_SUCESSO, USUARIO_LISTA_FALHA, USUARIO_DETALHES_REQUEST, USUARIO_DETALHES_SUCESSO,USUARIO_DETALHES_FALHA, USUARIO_LOGIN_FALHA, USUARIO_LOGIN_REQUEST, USUARIO_LOGIN_SUCESSO, USUARIO_LOGOUT, USUARIO_REGISTRO_FALHA, USUARIO_REGISTRO_REQUEST, USUARIO_REGISTRO_SUCESSO, USUARIO_ATUALIZAR_REQUEST, USUARIO_ATUALIZAR_FALHA, USUARIO_ATUALIZAR_SUCESSO } from "../constants/userConstants"


export const registro = (nome, email, password) => async(dispatch) =>{
    dispatch({type:USUARIO_REGISTRO_REQUEST, payload: {email, password}});
    try{
        const {data} = await Axios.post('/api/users/registro', {nome, email, password});
        dispatch({type: USUARIO_REGISTRO_SUCESSO, payload: data});
        dispatch({type: USUARIO_LOGIN_SUCESSO, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(error){
        dispatch({type: USUARIO_REGISTRO_FALHA, 
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
        });
    }
};


export const login = (email, password) => async(dispatch) =>{
    dispatch({type:USUARIO_LOGIN_REQUEST, payload: {email, password}});
    try{
        const {data} = await Axios.post('/api/users/login', {email, password});
        dispatch({type: USUARIO_LOGIN_SUCESSO, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(error){
        dispatch({type: USUARIO_LOGIN_FALHA, 
            payload: 
                error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
        });
    }
};



export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('itensCarrinho');
    localStorage.removeItem('enderecoEnvio');
    dispatch({type: USUARIO_LOGOUT});
};

export const detalhesUsuario = (userId) => async(dispatch, getState) => {
    dispatch({type: USUARIO_DETALHES_REQUEST, payload: userId});
    const {userLogin:{userInfo}} = getState();
    try{
        const {data} = await Axios.get(`/api/users/${userId}`, {
            headers:{ Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch ({type:USUARIO_DETALHES_SUCESSO, payload: data});

    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({type: USUARIO_DETALHES_FALHA, payload: message});
    }
};

export const atualizarDados =(user)=> async(dispatch, getState) =>{
    dispatch({type: USUARIO_ATUALIZAR_REQUEST, payload: user});

    const {userLogin:{userInfo}} = getState();
    try{
        const {data} = await Axios.put(`/api/users/perfil`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USUARIO_ATUALIZAR_SUCESSO, payload:data});

        dispatch({type: USUARIO_LOGIN_SUCESSO, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));

    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USUARIO_ATUALIZAR_FALHA, payload:message});
    }
};

export const listaUsuarios = () => async(dispatch, getState)=>{
    dispatch({type: USUARIO_LISTA_REQUEST });
    const {userLogin:{userInfo},} = getState();
    
    try{
        const {data} = await Axios.get('/api/users', {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USUARIO_LISTA_SUCESSO, payload:data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USUARIO_LISTA_FALHA, payload:message});
    }
};

export const deletarUser = (userId) => async (dispatch, getState) => {
    dispatch({type: DELETAR_USUARIO_REQUEST, payload:userId});
    const {userLogin:{userInfo},} = getState();

    try{
        
        const {data} = await Axios.delete(`/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        }); 
        dispatch({type: DELETAR_USUARIO_SUCESSO, payload:data});
    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: DELETAR_USUARIO_FALHA, payload:message});
    }

};

export const atualizarUsuario =(user)=> async(dispatch, getState) =>{
    dispatch({type: USUARIO_ATUALIZAR_ADM_REQUEST, payload: user});

    const {userLogin:{userInfo}} = getState();
    try{
        const {data} = await Axios.put(`/api/users/${user._id}`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USUARIO_ATUALIZAR_ADM_SUCESSO, payload:data});

        localStorage.setItem('userInfo', JSON.stringify(data));

    }catch(error){
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: USUARIO_ATUALIZAR_ADM_FALHA, payload:message});
    }
};