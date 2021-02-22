import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletarUser, listaUsuarios } from '../acoes/userAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';
import { USUARIO_DETALHES_RESET } from '../constants/userConstants';

export default function PaginaListaUsuariosAdm(props){
    const usuarioLista= useSelector((state)=> state.usuarioLista);
    const {loading, error, users} = usuarioLista;

    const usuarioDeletar= useSelector((state)=> state.usuarioDeletar);
    const {loading: loadingDeletar, error: errorDeletar, success: successDeletar} = usuarioDeletar;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listaUsuarios());
        dispatch({ type: USUARIO_DETALHES_RESET})
    },[dispatch, successDeletar]);

    const deletandoUser = (user) =>{
        if(window.confirm('Tem certeza que deseja deletar esse usuario?')){
            dispatch(deletarUser(user._id));


        }
    };

    return(
        <div>
            <h1>Usuarios</h1>

            {loadingDeletar && (<LoadingBox></LoadingBox>)}
            {errorDeletar && (<MessageBox variant="perigo">{errorDeletar}</MessageBox>)}
            {successDeletar && (<MessageBox variant="sucesso">Usuario deletado com sucesso</MessageBox>)}

            {
                loading ? (<LoadingBox></LoadingBox>)
                : error ? (<MessageBox variant="perigo">{error}</MessageBox>)
                : (
                    <table className="tabela">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>ADM</th>
                                <th>Açoes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user)=> (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? 'Sim':'Nao'}</td>
                                        <td>
                                            <button type="button" 
                                                className="pequeno" 
                                                onClick={()=> props.history.push(`/usuario/${user._id}/editar`)}>Editar</button>
                                            <button type="button" 
                                                className="pequeno" 
                                                onClick={()=>deletandoUser(user)}>Deletar</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            
            }
        </div>
    )
};