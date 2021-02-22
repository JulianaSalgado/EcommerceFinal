import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { criarPedido } from '../acoes/pedidoAcoes';
import Checkout from '../componentes/Checkout';
import { PEDIDO_CRIAR_RESET } from '../constants/pedidoConstantes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/LoadingBox';
 
 
export default function PaginaPedido(props){
   const carrinho= useSelector((state)=> state.carrinho);
 
   if(!carrinho.metodoPagamento){
       props.history.push('/pagamento');
   }
 
   const pedidoCriar = useSelector((state)=> state.pedidoCriar);
   const {loading, sucesso, error, pedido } = pedidoCriar;
   const precoCompra = (num) => Number(num.toFixed(2));
   carrinho.precoItens = precoCompra(carrinho.itensCarrinho.reduce((a,c)=> a + c.qtde * c.preco, 0 ));
   carrinho.precoEnvio = carrinho.precoItens > 100? precoCompra(0) : precoCompra(15);
   carrinho.imposto = precoCompra(0.23 * carrinho.precoItens);
  
   carrinho.valorTotal = carrinho.precoItens + carrinho.precoEnvio + carrinho.imposto;
  
   const dispatch = useDispatch();
   const fecharPedido = () => {
 
       dispatch(criarPedido({...carrinho, pedidoItens: carrinho.itensCarrinho}));
   };
 
   useEffect(()=>{
       if(sucesso){
           props.history.push(`/pedido/${pedido._id}`);
           dispatch({type: PEDIDO_CRIAR_RESET});
       }
   },[dispatch, pedido, props.history, sucesso]);
 
   return(
       <div>
           <Checkout passo1 passo2 passo3 passo4></Checkout>
           <div className="row topo">
               <div className="coluna2">
                   <ul>
                       <li>
                           <div className="divisao divisao-corpo">
                           <h2>Envio</h2>
                           <p>
                               <strong>Nome: </strong>{carrinho.enderecoEnvio.nomeCompleto} <br/>
                               <strong>Endereco: </strong>
                               {carrinho.enderecoEnvio.endereco},
                               {carrinho.enderecoEnvio.cidade},
                               {carrinho.enderecoEnvio.Cep},
                               {carrinho.enderecoEnvio.pais}
                           </p>
                           </div>
                       </li>
                       <li>
                           <div className="divisao divisao-corpo">
                           <h2>Pagamento</h2>
                           <p>
                               <strong>Metodo de Pagamento </strong>{carrinho.metodoPagamento}
                           </p>
                           </div>
                       </li>
                       <li>
                           <div className="divisao divisao-corpo">
                           <h2>Itens</h2>
                           <ul>
                          {
                              carrinho.itensCarrinho.map((item) => (
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
                                   <div> € {carrinho.precoItens.toFixed(2)} </div>
                               </div>
                           </li>
                           <li>
                               <div className="row">
                                   <div>Envio</div>
                                   <div> € {carrinho.precoEnvio.toFixed(2)} </div>
                               </div>
                           </li>
                           <li>
                               <div className="row">
                                   <div>Imposto</div>
                                   <div> € {carrinho.imposto.toFixed(2)} </div>
                               </div>
                           </li>
                           <li>
                               <div className="row">
                                   <div>Total do pedido: </div>
                                   <div> € {carrinho.valorTotal.toFixed(2)} </div>
                               </div>
                           </li>
                           <li>
                               <button type="button" onClick={fecharPedido} className="primario bloco">Finalizar compra</button>
                           </li>
                           {loading && <LoadingBox></LoadingBox>}
                           {error && <MessageBox variant="perigo">{error}</MessageBox>}
                       </ul>
                   </div>
                  
                  
               </div>
 
           </div>
       </div>
   )
}
 

