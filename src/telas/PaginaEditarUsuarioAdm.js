import React, { useEffect, useState } from 'react';
import { atualizarUsuario, detalhesUsuario } from '../acoes/userAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';
import {useDispatch, useSelector} from 'react-redux';
import { USUARIO_ATUALIZAR_ADM_RESET } from '../constants/userConstants';

export default function PaginaEditarUsuarioAdm(props){
    const userId = props.match.params.id;

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const usuarioInformacoes = useSelector((state) => state.usuarioInformacoes);
    const {loading, error, user} = usuarioInformacoes;

    const usuarioAdmAtualizar = useSelector((state) => state.usuarioAdmAtualizar);
    const {loading: loadingAtualizarUser, error: errorAtualizarUser, success: successAtualizarUser} = usuarioAdmAtualizar;

    const dispatch = useDispatch();

    useEffect(()=>{
        if(successAtualizarUser){
            dispatch({type: USUARIO_ATUALIZAR_ADM_RESET});
            props.history.push('/listausuarios');
        }
        if(!user){
            dispatch(detalhesUsuario(userId));
        }else{
            setNome(user.nome);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[dispatch, props.history, user, successAtualizarUser, userId]);
    const submeter = (e) => {
        e.preventDefault();

        dispatch(atualizarUsuario({_id: userId, nome, email, isAdmin}));

    };
    return(
        <div>
            <form className="formulario" onSubmit={submeter}>
                <div><h1>Editar usuario {nome}</h1>

                {loadingAtualizarUser && <LoadingBox></LoadingBox> }
                {errorAtualizarUser && <MessageBox variant="perigo">{errorAtualizarUser}</MessageBox>}

                </div>

                {loading ? (
                    <LoadingBox/>
                ) : error ? (
                     <MessageBox variant="perigo">{error}</MessageBox>
                ) : (
                <>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" 
                        type="text" 
                        placeholder="Digite o nome"
                        value={nome}
                        onChange={(e)=> setNome(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" 
                        type="email" 
                        placeholder="Digite o email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="isAdmin">Adm</label>
                    <input id="isAdmin" 
                        type="checkbox" 
                        checked={isAdmin}
                        onChange={(e)=> setIsAdmin(e.target.checked)}>
                    </input>
                </div>
                <div>
                    <button type="submit" className="primario">Atualizar</button>
                </div>
                </>
                )}
            </form>
                
        </div>
    );
}    