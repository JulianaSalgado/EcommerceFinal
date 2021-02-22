import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { detalhesProduto } from '../acoes/produtoAcoes';
import Avaliacao from '../componentes/Avaliacao';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';

export default function PaginaProduto(props){
    const dispatch = useDispatch();
    const produtoId = props.match.params.id;
    const [qtde, setQtde] = useState(1);
   const produtoDetalhes = useSelector((state) => state.produtoDetalhes);
   const {loading, error, produto} = produtoDetalhes;

   useEffect(()=>{
       dispatch(detalhesProduto(produtoId));
   },[dispatch, produtoId]);

   const addCarrinho = () =>{
       props.history.push(`/carrinho/${produtoId}?qtde=${qtde}`);
   };
   return (
    <div>
    {loading ? (
    <LoadingBox></LoadingBox>
    ):
    error ? (<MessageBox variant="perigo">{error}</MessageBox>
    ): (
   
        <div>
           <Link to="/">Voltar a pagina inicial</Link>
           <div className="row topo">
               <div className="coluna2">
                   <img className="grande" src={produto.imagem} alt={produto.nome}></img>
               </div>
               <div className="coluna1">
                   <ul>
                       <li>
                           <h1>{produto.nome}</h1>
                       </li>
                       <li>
                           <Avaliacao
                               avaliacao={produto.avaliacao}
                               numReviews={produto.numReviews}>
                           </Avaliacao>
                       </li>
                       <li>Preco: $ {produto.preco}</li>
                       <li>Descricao:  {produto.descricao}</li>
                   </ul>
               </div>
               <div className="coluna1">
                   <div className="divisao divisao-corpo">
                       <ul>
                           <li>
                               <div className="row">
                                   <div> Preco </div>
                                   <div className="preco">${produto.preco}</div>
                               </div>
                           </li>
                           <li>
                               <div className="row">
                                   <div> Status </div>
                                   <div >
                                       {produto.qtdStock>0 ? (<span className="sucesso">Em estoque</span>
                                       ):(
                                       <span className="error">Indisponível</span>
                                       )}
 
                                   </div>
                               </div>
                           </li>
                            {produto.qtdStock > 0 && (
                                    <>
                                    <li>
                                        <div className="row">
                                            <div>Quantidade</div>
                                            <div>
                                                <select value={qtde} onChange={e => setQtde(e.target.value)}>
                                                    {
                                                        [...Array(produto.qtdStock).keys()].map((x) => (
                                                            <option key= {x+1} value={x+1}>{x+1}</option>
                                                        )
                                                        )}
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                        <li>
                                            <button onClick={addCarrinho} className="primario bloco">Adicionar ao carrinho</button>
                                        </li>
                                    </>
                            )}

                        </ul>
                   </div>
               </div>
           </div>
       </div>

    )}
   
  </div>   
       
   )
};
