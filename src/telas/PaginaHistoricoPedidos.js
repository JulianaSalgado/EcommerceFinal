import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listaHistoricoPedidos } from '../acoes/pedidoAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';

export default function PaginaHistoricoPedidos(props){
    const minhaListaHistPedido = useSelector((state) => state.minhaListaHistPedido);
    const {loading, error, pedidos} = minhaListaHistPedido;

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch (listaHistoricoPedidos());
    }, [dispatch]);

    return(
        <div>
            <h1>Historico de pedidos: </h1>
            {loading? <LoadingBox></LoadingBox>
                : error ? <MessageBox variant="perigo">{error}</MessageBox> : 
                (
                <table className="tabela">
                    <thead>
                        <tr>
                            <th>Id Pedido</th>
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
                                <td>{pedido.criadoEm}</td>
                                <td>{pedido.valorTotal.toFixed(2)}</td>
                                <td>{pedido.estaPago ? pedido.pagoQnd:'Nao'}</td>
                                <td>{pedido.pedidoEnviado ? pedido.enviadoQnd:'Nao'}</td>
                                <td>
                                    <button type="button" className="pequeno" onClick={() => {props.history.push(`/pedido/${pedido._id}`)}}>Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )
            }

        </div>
    );
}