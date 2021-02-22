import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { carrinhoReducer } from './reducers/carrinhoReducer';
import { deletarPedidoReducer, enviarPedidoReducer, listaHistPedidoReducer, listaPedidosAdmReducer, pedidoCriadoReducer, pedidoDetalhesReducer } from './reducers/pedidoReducers';
import { atualizacaoProdutoReducer, criarProdutoReducer, deletarProdutoReducer, produtoDetalhesReducer, produtoListaReducer } from './reducers/produtoReducers';
import { atualizarDadosReducer, atualizarUsuarioAdmReducer, userLoginReducer, userRegistroReducer, usuarioDeletarReducer, usuarioDetalhesReducer, usuarioListaReducer } from './reducers/userReducer';
 
const initialState = {
   userLogin:{
      userLogin: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo')) : null,

   },
   carrinho:{
      itensCarrinho: localStorage.getItem('itensCarrinho') ? JSON.parse(localStorage.getItem('itensCarrinho'))
      : [],
      enderecoEnvio: localStorage.getItem('enderecoEnvio')
      ? JSON.parse(localStorage.getItem('enderecoEnvio'))
      :{},
      metodoPagamento: 'MBWay',
  },
};
const reducer = combineReducers({
   produtoLista: produtoListaReducer,
   produtoDetalhes: produtoDetalhesReducer,
   carrinho: carrinhoReducer,
   userLogin: userLoginReducer,
   userRegistro: userRegistroReducer,
   pedidoCriar: pedidoCriadoReducer,
   pedidoDetalhes: pedidoDetalhesReducer,
   minhaListaHistPedido: listaHistPedidoReducer,
   usuarioInformacoes: usuarioDetalhesReducer,
   dadosAtualizados: atualizarDadosReducer,
   usuarioAdmAtualizar: atualizarUsuarioAdmReducer,
   produtoCriar: criarProdutoReducer,
   produtoAtualizacao: atualizacaoProdutoReducer,
   produtoDeletar: deletarProdutoReducer,
   pedidoListaAdm: listaPedidosAdmReducer,
   pedidoDeletar: deletarPedidoReducer,
   pedidoEnviar: enviarPedidoReducer, 
   usuarioLista: usuarioListaReducer,
   usuarioDeletar: usuarioDeletarReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
 
export default store;