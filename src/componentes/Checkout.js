import { PromiseProvider } from 'mongoose';
import React from 'react';

export default function Checkout(props){
    return(
        
        <div className="row checkout">
            <div className={props.passo1 ? 'active' : ''}>Login</div>
            <div className={props.passo2 ? 'active' : ''}>Envio</div>
            <div className={props.passo3 ? 'active' : ''}>Pagamento</div>
            <div className={props.passo4 ? 'active' : ''}>Pedido</div>
        </div>
    );
}
