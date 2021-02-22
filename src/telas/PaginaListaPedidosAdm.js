import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deletarPedido, listaPedidosAdm } from '../acoes/pedidoAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';
import { PEDIDOS_ADM_DELETAR_RESET } from '../constants/pedidoConstantes';

export default function PaginaListaPedidosAdm(props){

    const pedidoListaAdm = useSelector((state)=> state.pedidoListaAdm);
    const {loading, error, pedidos} = pedidoListaAdm;
    const dispatch = useDispatch();

    const pedidoDeletar = useSelector((state)=> state.pedidoDeletar);
    const {loading: loadingDeletarPedido, error: errorDeletarPedido, success: successDeletarPedido} = pedidoDeletar;

    useEffect(() => {
        
        dispatch({type: PEDIDOS_ADM_DELETAR_RESET});
        dispatch(listaPedidosAdm());
        
    }, [dispatch, successDeletarPedido]);

    const deletarProduto =(pedido)=>{

        if(window.confirm('Tem certeza que deseja deletar? ')){
            dispatch(deletarPedido(pedido._id));
        }
    };

    return(
        <div>
            <div>
            <h1>Pedidos: </h1>
            {loadingDeletarPedido && <LoadingBox></LoadingBox>}
            {errorDeletarPedido && <MessageBox variant="perigo">{errorDeletarPedido}</MessageBox>}
            
            {loading? (<LoadingBox></LoadingBox>)
                : error ? (<MessageBox variant="perigo">{error}</MessageBox>) : 
                (
                <table className="tabela">
                    <thead>
                        <tr>
                            <th>Id Pedido</th>
                            <th>Usuario</th>
                            <th>Data </th>
                            <th>Total</th>
                            <th>Pago</th>
                            <th>Envio</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido._id}>
                                <td>{pedido._id}</td>
                                <td>{pedido.nome}</td>
                                <td>{pedido.criadoEm}</td>
                                <td>{pedido.valorTotal.toFixed(2)}</td>
                                <td>{pedido.estaPago ? pedido.pagoQnd:'Nao'}</td>
                                <td>{pedido.pedidoEnviado ? pedido.enviadoQnd:'Nao'}</td>
                                <td>
                                    <button type="button" className="pequeno" onClick={() => {props.history.push(`/pedido/${pedido._id}`)}}>Detalhes</button>
                                
                                <button type="button" className="pequeno" onClick={() => deletarProduto(pedido)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )
            }

        </div>
        </div>
    )
};