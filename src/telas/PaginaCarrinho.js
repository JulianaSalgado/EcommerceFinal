import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addAoCarrinho, removerItemCarrinho } from '../acoes/carrinhoAcoes';
import MessageBox from '../componentes/MessageBox';

export default function PaginaCarrinho(props){
    const produtoId = props.match.params.id;
    const qtde = props.location.search ? Number(props.location.search.split('=')[1]): 1;

    const carrinho = useSelector((state) => state.carrinho);
    const { itensCarrinho} = carrinho;
    const dispatch = useDispatch();
    useEffect(() => {
        if(produtoId){
            dispatch(addAoCarrinho(produtoId, qtde));
        }
    }, [dispatch, produtoId, qtde]);

    const removerDoCarrinho = (id) => {
        dispatch(removerItemCarrinho(id));
    }

    const pagarCompra = () =>{
        props.history.push('/login?redirect=envio');
    }
    return(
       <div className="row topo">
           <div className="coluna2">
               <h1>Carrinho de compras</h1>
               {itensCarrinho.length === 0?
               <MessageBox>
                   Nao existem produtos no carrinho. <Link to="/">Volte a pagina inicial e compre</Link>
                   </MessageBox>
                   :
                   (
                       <ul>
                           {
                               itensCarrinho.map((item) => (
                                    <li key={item.produto}>
                                        <div className="row">
                                            <div>
                                                <img className="pequeno" src={item.imagem} alt={item.nome}></img>
                                            </div>
                                        </div>
                                        <div className="minimo">
                                            <Link to={`/produto/${item.produto}`}>{item.nome}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qtde} 
                                            onChange={(e) => 
                                            dispatch(
                                                addAoCarrinho(item.produto, Number(e.target.value))
                                            )
                                            }>
                                                {
                                                        [...Array(item.qtdStock).keys()].map((x) => (
                                                            <option key= {x+1} value={x+1}>{x+1}</option>
                                                        )
                                                        )}        
                                            </select>
                                        </div>
                                        <div> ${item.preco}</div>
                                        <div>
                                            <button type="button" onClick={() => removerDoCarrinho(item.produto)}>
                                                Deletar
                                            </button>
                                        </div>
                                    </li>
                               ))}
                       </ul>
                   )}
            </div>
            <div className="coluna1">
                <div className="divisao divisao-corpo">
                    <ul>
                        <li>
                            <h2>Subtotal ({itensCarrinho.reduce((a,c) =>
                                a + c.qtde, 0)} item) 
                                : 
                                ${itensCarrinho.reduce((a,c) => a + c.preco * c.qtde, 0)}
                             </h2>
                        </li>
                        <li>
                            <button type="button" 
                                onClick={pagarCompra} 
                                className="primario bloco" 
                                disabled={itensCarrinho.length===0}>
                                Finalizar compra
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
       </div>
    )
}