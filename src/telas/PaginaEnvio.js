import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { salvarEndereco } from '../acoes/carrinhoAcoes';
import Checkout from '../componentes/Checkout';

export default function PaginaEnvio(props){
    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;
    const carrinho = useSelector((state)=> state.carrinho);
    const{enderecoEnvio} = carrinho;
    if(!userInfo){
        props.history.push('/login');
    }
    const [nomeCompleto, setNomeCompleto] = useState(enderecoEnvio.nomeCompleto);
    const [endereco, setEndereco] = useState(enderecoEnvio.endereco);
    const [cidade, setCidade] = useState(enderecoEnvio.cidade);
    const [Cep, setCEP] = useState(enderecoEnvio.Cep);
    const [pais, setPais] = useState(enderecoEnvio.pais);
    const dispatch = useDispatch();

    const submeter = (e) => {
        e.preventDefault();

        dispatch(salvarEndereco({nomeCompleto, endereco, cidade, Cep, pais}));
        props.history.push('/pagamento');
    };
    return(
        <div>
            <Checkout passo1 passo2></Checkout>
            <form className="formulario" onSubmit={submeter}>
                <div>
                    <h1>Cadastro de Endereco</h1>
                </div>
                <div>
                    <label htmlFor="nomeCompleto">Nome Completo</label>
                    <input 
                        type="text" 
                        id="nomeCompleto" 
                        placeholder="Digite nome completo" 
                        value={nomeCompleto} 
                        onChange={(e) => setNomeCompleto(e.target.value)} 
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="endereco">Endereco</label>
                    <input 
                        type="text" 
                        id="endereco" 
                        placeholder="Digite endereco completo" 
                        value={endereco} 
                        onChange={(e) => setEndereco(e.target.value)} 
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="cidade">Cidade</label>
                    <input 
                        type="text" 
                        id="cidade" 
                        placeholder="Digite a cidade" 
                        value={cidade} 
                        onChange={(e) => setCidade(e.target.value)} 
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="Cep">CEP</label>
                    <input 
                        type="text" 
                        id="Cep" 
                        placeholder="Digite o CEP" 
                        value={Cep} 
                        onChange={(e) => setCEP(e.target.value)} 
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor="pais">País</label>
                    <input 
                        type="text" 
                        id="pais" 
                        placeholder="Digite o país" 
                        value={pais} 
                        onChange={(e) => setPais(e.target.value)} 
                        required>
                    </input>
                </div>
                <div>
                    <label />
                    <button className="primario" type="submit">Proximo passo</button>
                </div>
            </form> 
        </div>
    )
}