//import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { salvarPagamento } from '../acoes/carrinhoAcoes';
import Checkout from '../componentes/Checkout';

export default function PaginaPagamento(props){
    const carrinho = useSelector((state)=> state.carrinho);
    const {enderecoEnvio} = carrinho;
    if(!enderecoEnvio.endereco){
        props.history.push('/envio');

    }
    const [metodoPagamento, setMetodoPagamento] = useState('MBWay');
    const dispatch = useDispatch();
    const submeter = (e) => {
        e.preventDefault();
        dispatch(salvarPagamento(metodoPagamento));
        props.history.push('/finalizarpedido');
    };
    return(
        <div>
            <Checkout passo1 passo2 passo3 ></Checkout>
            <form className="formulario" onSubmit={submeter}>
                <div>
                    <h1>Pagamento</h1>
                </div>
                <div>
                   <div>
                    <input 
                        type="radio" 
                        id="mbway" 
                        value="MBWay" 
                        name="metodoPagamento" 
                        required 
                        checked 
                        onChange={(e)=> setMetodoPagamento(e.target.value)}>
                    </input>
                    <label htmlFor="mbway">MB Way</label>
                   </div>
                </div> 
                <div>
                   <div>
                    <input 
                        type="radio" 
                        id="boleto" 
                        value="boleto" 
                        name="metodoPagamento" 
                        required 
                        onChange={(e)=> setMetodoPagamento(e.target.value)}>
                    </input>
                    <label htmlFor="boleto">Boleto</label>
                   </div>
                </div> 
                <div>
                    <button className="primario" type="submit">Proximo passo</button>
                </div>
            </form>
        </div>
    )
}