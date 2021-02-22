import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { detalhesPedido } from '../acoes/pedidoAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';


export default function PaginaDetalhesPedidos(props){

    const pedidoId = props.match.params.id;
    const pedidoDetalhes = useSelector((state)=> state.pedidoDetalhes);
    const {pedido, loading, error} = pedidoDetalhes;

    const dispatch = useDispatch();
    
    useEffect(()=>{
       dispatch(detalhesPedido(pedidoId));
    },[dispatch, pedidoId]);

    return loading ? (<LoadingBox></LoadingBox>): 
        error ? (<MessageBox variant="perigo">{error}</MessageBox>)
        :
        (
        <div>
           <h1>Pedido: {pedido._id}</h1>
            <div className="row topo">
                <div className="coluna2">
                    <ul>
                        <li>
                            <div className="divisao divisao-corpo">
                            <h2>Envio</h2>
                            <p>
                                <strong>Nome: </strong>{pedido.enderecoEnvio.nomeCompleto} <br/>
                                <strong>Endereco: </strong>
                                {pedido.enderecoEnvio.endereco}, 
                                {pedido.enderecoEnvio.cidade},
                                {pedido.enderecoEnvio.Cep}, 
                                {pedido.enderecoEnvio.pais}
                            </p>
                            {pedido.pedidoEnviado? (<MessageBox variant="sucesso">Enviado em {pedido.enviadoQnd}</MessageBox>)
                            : (<MessageBox variant="perigo"> Nao enviado </MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="divisao divisao-corpo">
                            <h2>Pagamento</h2>
                            <p>
                                <strong>Metodo de Pagamento </strong>{pedido.metodoPagamento}
                            </p>
                            {pedido.estaPago? (<MessageBox variant="sucesso">Pago em {pedido.pagoQnd}</MessageBox>)
                            : (<MessageBox variant="perigo"> Aguardando pagamento </MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="divisao divisao-corpo">
                            <h2>Itens</h2>
                            <ul>
                                {pedido.pedidoItens.map((item) => (
                                    <li key={item.produto}>
                                        <div className="row">
                                            <div>
                                                <img className="pequeno" src={item.imagem} alt={item.nome}></img>
                                            </div>
                                        </div>
                                        <div className="minimo">
                                            <Link to={`/produto/${item.produto}`}>{item.nome}</Link>
                                        </div>
                                        
                                        <div> {item.qtde} x € {item.preco} = € {item.qtde * item.preco}</div>
                                        
                                    </li>
                                ))}
                            </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="coluna1">
                    <div className="divisao divisao-corpo">
                        <ul>
                            <li>
                                <h2>Resumo da compra</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Produtos</div>
                                    <div> € {pedido.precoItens.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Envio</div>
                                    <div> € {pedido.precoEnvio.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Imposto</div>
                                    <div> € {pedido.imposto.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Total do pedido: </div>
                                    <div> € {pedido.valorTotal.toFixed(2)} </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                    
                    
                </div>

            </div>
        </div>
    ) 
};