import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { login, registro } from '../acoes/userAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';


export default function PaginaLogin(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirecionar = props.location.search? props.location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo, loading, error} = userLogin;

    const dispatch = useDispatch();
    const submeter = (e) => {
        e.preventDefault();
            dispatch(login(email, password));
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
                    <h1>Login</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="perigo">{error}</MessageBox>}
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
                    <label />
                    <button className="primario" type="submit">Login</button>
                </div>
                <div>
                    <label/>
                    <div> Novo por aqui? {' '} <Link to={`/registro?redirecionar=${redirecionar}`}> Criar conta</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}