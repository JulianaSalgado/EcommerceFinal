import React, { useEffect } from 'react';
import Produto from '../componentes/Produto';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';
import {useDispatch, useSelector} from 'react-redux';
import {listaProdutos} from '../acoes/produtoAcoes';
//import data from '../data';
export default function PaginaInicial(){
 const dispatch = useDispatch();
 const produtoLista = useSelector(state => state.produtoLista);
 const {loading, error, produtos} = produtoLista;
 
 useEffect(() => {
   dispatch(listaProdutos());
 }, [dispatch]);
 
  return (
    <div>
      {loading ? (
      <LoadingBox></LoadingBox>
      ):
      error ? (<MessageBox variant="perigo">{error}</MessageBox>
      ): (
     <div className=" row central">
       {
         produtos.map((produto) => (
           <Produto key={produto._id} produto={produto}></Produto>
         ))
       }       
      </div>
      )}
     
    </div>          
  );
}
