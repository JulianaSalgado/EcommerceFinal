import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { criarProduto, deletarProduto, listaProdutos } from '../acoes/produtoAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';
import { PRODUTO_CRIAR_RESET, PRODUTO_DELETAR_FALHA, PRODUTO_DELETAR_RESET } from '../constants/produtoConstantes';

export default function PaginaListaProdutos(props){
    const produtoLista= useSelector((state) => state.produtoLista);
    const {loading, error, produtos} = produtoLista;

    const produtoCriar = useSelector((state)=> state.produtoCriar);
    const {loading: loadingCriacao, error: errorCriacao, success: successCriacao, produto: criadoProduto} = produtoCriar;

    const produtoDeletar= useSelector((state)=> state.produtoDeletar);
    const {loading: loadingDeletar, error:errorDeletar, success:successDeletar} = produtoDeletar;

    const dispatch = useDispatch();

    useEffect(()=>{
        if(successCriacao){
            dispatch({type: PRODUTO_CRIAR_RESET});
            props.history.push(`/produto/${criadoProduto._id}/editar`);
        }
        if(successDeletar){
            dispatch({type: PRODUTO_DELETAR_RESET});
        }
        dispatch(listaProdutos());
    },[criadoProduto, dispatch, props.history, successCriacao, successDeletar]);
    

    const deletandoProduto =(produto) =>{

        dispatch(deletarProduto(produto._id));
    };

    const criarNovoProduto =()=>{
        dispatch(criarProduto());
    };

    return(
        <div>
            <div className="row">
                <h1>Lista Produtos</h1>

                <button type="button" className="primario" 
                    onClick={criarNovoProduto}>Criar Produto
                </button>

            </div>
            {loadingDeletar && <LoadingBox></LoadingBox>}
            {errorDeletar && <MessageBox variant="danger">{errorDeletar}</MessageBox>}

            {loadingCriacao && <LoadingBox></LoadingBox>}
            {errorCriacao && <MessageBox variant="danger">{errorCriacao}</MessageBox>}
          
            {
                loading ? ( <LoadingBox></LoadingBox> )
                : 
                error ? ( <MessageBox variant="perigo">{error}</MessageBox> )
                :
                <table className="tabela">
                    <thead>
                        <tr>
                            <th>Produto Id</th>
                            <th>Nome</th>
                            <th>Preco</th>
                            <th>Categoria</th>
                            <th>Marca</th>
                            <th>Acoes</th>
                        </tr>
                    </thead>
                    
                    {produtos.map((produto)=>(
                    <tr key={produto._id}>
                            <td>{produto._id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.preco}</td>
                            <td>{produto.categoria}</td>
                            <td>{produto.marca}</td>
                            <td>
                                <button type="button" 
                                    className="pequeno" 
                                    onClick={()=> props.history.push(`/produto/${produto._id}/editar`)}>Editar</button>

                                <button type="button" 
                                    className="pequeno" 
                                    onClick={() => deletandoProduto(produto)}>Deletar</button>
                            </td>
                    </tr>
                    ))
                    }
                   
                    
                </table>
            }
            
        </div>
    )
};
