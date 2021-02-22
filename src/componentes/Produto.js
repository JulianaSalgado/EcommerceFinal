import React from 'react';
import { Link } from 'react-router-dom';
import Avaliacao from './Avaliacao';

export default function Produto(props){
    const {produto} = props;
    return(
        <div key={produto.id} className="divisao">
                        <Link to={`/produto/${produto._id}`}>
                            <img className="medio" src={produto.imagem} alt={produto.nome} />
                        </Link>
                        <div className="divisao-corpo">
                            <Link to={`/produto/${produto._id}`}>
                                <h2>{produto.nome}</h2>
                            </Link>
                            <Avaliacao 
                                avaliacao={produto.avaliacao} 
                                numReviews={produto.numReviews}>
                            </Avaliacao>
                            <div className="preco">€ {produto.preco}</div>

                        </div>
                    </div>
    )
}