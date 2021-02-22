import { DELETAR_USUARIO_FALHA, DELETAR_USUARIO_RESET, DELETAR_USUARIO_REQUEST, DELETAR_USUARIO_SUCESSO, USUARIO_ATUALIZAR_FALHA, USUARIO_ATUALIZAR_REQUEST, USUARIO_ATUALIZAR_RESET, USUARIO_ATUALIZAR_SUCESSO, USUARIO_DETALHES_FALHA, USUARIO_DETALHES_REQUEST, USUARIO_DETALHES_SUCESSO, USUARIO_LISTA_FALHA, USUARIO_LISTA_REQUEST, USUARIO_LISTA_SUCESSO, USUARIO_LOGIN_FALHA, USUARIO_LOGIN_REQUEST, USUARIO_LOGIN_SUCESSO, USUARIO_LOGOUT, USUARIO_REGISTRO_FALHA, USUARIO_REGISTRO_REQUEST, USUARIO_REGISTRO_SUCESSO, USUARIO_ATUALIZAR_ADM_REQUEST, USUARIO_ATUALIZAR_ADM_SUCESSO, USUARIO_ATUALIZAR_ADM_FALHA, USUARIO_ATUALIZAR_ADM_RESET, USUARIO_DETALHES_RESET } from "../constants/userConstants";

export const userRegistroReducer = (state={}, action) =>{
    switch (action.type) {
        case USUARIO_REGISTRO_REQUEST:
            return {loading: true};

        case USUARIO_REGISTRO_SUCESSO:
            return{loading:false, userInfo: action.payload };   
        
        case USUARIO_REGISTRO_FALHA:
            return{loading: false, error: action.payload};

        default:
            return state;
    }
};


export const userLoginReducer = (state={}, action) =>{
    switch (action.type) {
        case USUARIO_LOGIN_REQUEST:
            return {loading: true};

        case USUARIO_LOGIN_SUCESSO:
            return{loading:false, userInfo: action.payload };   
        
        case USUARIO_LOGIN_FALHA:
            return{loading: false, error: action.payload};

        case USUARIO_LOGOUT:    
            return{};

        default:
            return state;
    }
};

export const usuarioDetalhesReducer=( state={loading: true}, action) =>{
    switch(action.type){
        case USUARIO_DETALHES_REQUEST:
            return{loading:true};

        case USUARIO_DETALHES_SUCESSO:
            return{loading:false, user: action.payload};

        case USUARIO_DETALHES_FALHA:
            return {loading: false, error:action.payload};

        case USUARIO_DETALHES_RESET:
            return {loading: true};

        default:
            return state;    
    }
};

export const atualizarDadosReducer = (state={}, action)=>{
    switch(action.type){
        case USUARIO_ATUALIZAR_REQUEST:
            return{loading:true};
        
        case USUARIO_ATUALIZAR_SUCESSO:
            return{loading: false, success: true};

        case USUARIO_ATUALIZAR_FALHA:
            return{loading:false, error: action.payload};
        
        case USUARIO_ATUALIZAR_RESET:
            return {};

        default: 
            return state;    
    }
};

export const usuarioListaReducer = (state ={loading:true}, action) =>{
    switch (action.type){
        case USUARIO_LISTA_REQUEST:
            return{loading:true};

        case USUARIO_LISTA_SUCESSO:
            return{loading:false, users: action.payload};
        
        case USUARIO_LISTA_FALHA:
            return{loading: false, error: action.payload}; 

        default: return state;
    }
};

export const usuarioDeletarReducer = (state ={ }, action) =>{
    switch (action.type){
        case DELETAR_USUARIO_REQUEST:
            return{loading:true};

        case DELETAR_USUARIO_SUCESSO:
            return{loading:false, success:true};
        
        case DELETAR_USUARIO_FALHA:
            return{loading: false, error: action.payload}; 
        
        case DELETAR_USUARIO_RESET:
            return {};

        default: return state;
    }
};

export const atualizarUsuarioAdmReducer = (state={}, action)=>{
    switch(action.type){
        case USUARIO_ATUALIZAR_ADM_REQUEST:
            return{loading:true};
        
        case USUARIO_ATUALIZAR_ADM_SUCESSO:
            return{loading: false, success: true};

        case USUARIO_ATUALIZAR_ADM_FALHA:
            return{loading:false, error: action.payload};
        
        case USUARIO_ATUALIZAR_ADM_RESET:
            return {};

        default: 
            return state;    
    }
};