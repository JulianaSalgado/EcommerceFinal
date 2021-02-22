import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { registro } from '../acoes/userAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';


export default function PaginaRegistro(props){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');

    const redirecionar = props.location.search? props.location.search.split('=')[1] : '/';

    const userRegistro = useSelector((state) => state.userRegistro);
    const {userInfo, loading, error} = userRegistro;

    const dispatch = useDispatch();
    const submeter = (e) => {
        e.preventDefault();
        if(password !== confirmarPassword){
            alert('As senhas nao coincidem')
        }else{
             dispatch(registro(nome, email, password));
        }
    };
    useEffect (()=> {
        if(userInfo){
            props.history.push(redirecionar);
        }
    }, [props.history, redirecionar, userInfo]);

    return (
        <div>
            <form className="formulario" onSubmit={submeter}>
                <div>
                    <h1>Registro</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="perigo">{error}</MessageBox>}
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input 
                        type="text" 
                        id="nome" 
                        placeholder="Insira o nome" 
                        required 
                        onChange={(e) => setNome(e.target.value)}>  
                    </input>
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Insira email" 
                        required 
                        onChange={(e) => setEmail(e.target.value)}>  
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Insira password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)}>  
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmarPassword">Confirme sua senha</label>
                    <input 
                        type="password" 
                        id="confirmarPassword" 
                        placeholder="Insira confirmacao password" 
                        required 
                        onChange={(e) => setConfirmarPassword(e.target.value)}>  
                    </input>
                </div>
                <div>
                    <label />
                    <button className="primario" type="submit">Registrar</button>
                </div>
                <div>
                    <label/>
                    <div> Já possui conta? {' '} <Link to={`/login?redirecionar=${redirecionar}`}> Login</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}