import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { atualizarDados, detalhesUsuario } from '../acoes/userAcoes';
import MessageBox from '../componentes/MessageBox';
import LoadingBox from '../componentes/LoadingBox';
import { USUARIO_ATUALIZAR_RESET } from '../constants/userConstants';

export default function PaginaUsuario(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    const userLogin = useSelector((state)=> state.userLogin);
    const {userInfo} = userLogin;
    const usuarioInformacoes = useSelector((state)=> state.usuarioInformacoes);
    const {loading, error, user}= usuarioInformacoes;

    const dadosAtualizados =useSelector((state) => state.dadosAtualizados);
    const {success: successAtualizacao, error: errorAtualizacao, loading: loadingAtualizacao} = dadosAtualizados;

    const dispatch = useDispatch();

    useEffect(() => {
        if(!user){
            dispatch({type: USUARIO_ATUALIZAR_RESET});
            dispatch(detalhesUsuario(userInfo._id));
        }
        else{
            setNome(user.nome);
            setEmail(user.email);

        }
    }, [dispatch, userInfo._id, user]);

    const submeter = (e) => {
        e.preventDefault();

        if(password !== confirmarPassword){
            alert('As senhas nao coincidem');
        }else{
            dispatch(atualizarDados({userId: user._id,  nome, email, password }));
        }

    };

    return(
        <div>
            <form className="formulario" onSubmit={submeter}>
                <div><h1>Perfil do Usuario</h1></div>

                {
                    loading ? (<LoadingBox></LoadingBox>)
                    : error ? (<MessageBox variant="perigo">{error}</MessageBox>)
                    : (<>
                        <div>
                            {loadingAtualizacao && <LoadingBox></LoadingBox>}
                            {errorAtualizacao && (<MessageBox variant="perigo">{errorAtualizacao}</MessageBox>)}
                            {successAtualizacao && (<MessageBox>Atualizacao feita com sucesso</MessageBox>)}
                            <label htmlFor="name">Nome</label>
                            <input id="name" 
                                type="text" 
                                placeholder="Digite seu nome" 
                                value={nome}
                                onChange={(e)=> setNome(e.target.value)}>

                            </input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" 
                                type="email" 
                                placeholder="Digite seu email" 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" 
                                type="password" 
                                placeholder="Digite a password"
                                onChange={(e)=> setpassword(e.target.value)}>
                                    
                            </input>
                        </div>
                        <div>
                            <label htmlFor="confirmarPassword">Confirmar Password</label>
                            <input id="confirmarPassword" 
                                type="password" 
                                placeholder="Digite novamente a password" 
                                onChange={(e)=> setConfirmarPassword(e.target.value)}>
                            </input>
                        </div>
                        <div>
                            <label/>
                            <button className="primario" type="submit">Atualizar</button>
                        </div>


                        
                    </>
                    )}

            </form>

        </div>
    )
}