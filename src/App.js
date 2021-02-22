import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import { logout } from './acoes/userAcoes';
import RotaPrivada from './componentes/RotaPrivada';
import AdmPrivado from './componentes/AdmPrivado';
import PaginaCarrinho from './telas/PaginaCarrinho';
import PaginaDetalhesPedidos from './telas/PaginaDetalhesPedidos';
import PaginaEnvio from './telas/PaginaEnvio';
import PaginaHistoricoPedidos from './telas/PaginaHistoricoPedidos';
import PaginaInicial from './telas/PaginaInicial';
import PaginaListaProdutos from './telas/PaginaListaProdutos';
import PaginaLogin from './telas/PaginaLogin';
import PaginaPagamento from './telas/PaginaPagamento';
import PaginaPedido from './telas/PaginaPedido';
import PaginaProduto from './telas/PaginaProduto';
import PaginaRegistro from './telas/PaginaRegistro';
import PaginaUsuario from './telas/PaginaUsuario';
import PaginaEdicaoProdutos from './telas/PaginaEdicaoProduto';
import PaginaListaPedidosAdm from './telas/PaginaListaPedidosAdm';
import PaginaListaUsuariosAdm from './telas/PaginaListaUsuariosAdm';
import PaginaEditarUsuarioAdm from './telas/PaginaEditarUsuarioAdm';



function App() {

  const carrinho = useSelector(state => state.carrinho);
  const {itensCarrinho} = carrinho;
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());

  };
  
    return(
    <BrowserRouter>
    <div className="container">
            <header className="row">
                <div>
                    <Link className="marca"  to="/">Ecommerce</Link>
                </div>
                <div>
                    <Link to="/carrinho">Carrinho {itensCarrinho.lenght > 0 && (
                      <span className="etiqueta">{itensCarrinho.lenght}</span>
                    )}</Link>
                    {
                      userInfo ? (
                        <div className="dropdown">
                        <Link to="#">
                          {userInfo.nome} <i className="fa fa-caret-down"></i>{' '}
                        </Link>

                        <ul className="dropdown-content">
                          <li>
                            <Link to="/perfil">Perfil do Usuário</Link>
                          </li>
                          <li>
                            <Link to="/historicopedidos">Historico</Link>
                          </li>
                          <Link to="#logout" onClick={logoutHandler}>Logout</Link>
                        </ul>
                        </div>
                      ):
                      (
                        <Link to="/login">Login</Link>
                      )
                    }
                    {
                      userInfo && userInfo.isAdmin &&(
                        <div classname="dropdown">
                          <Link to="#admin">Adm {' '} <i className="fa fa-caret-down"></i> </Link>
                          <ul className="descer-cont">
                            <li>
                              <Link to="/painel">Painel Controle</Link>
                            </li>

                            <li>
                              <Link to="/listaprodutos">Produtos</Link>
                            </li>
                            <li>
                              <Link to="/listapedidos">Pedidos</Link>
                            </li>
                            <li>
                              <Link to="/listausuarios">Usuarios</Link>
                            </li>
                          </ul>

                        </div>
                      )
                    }
                </div>
            </header>

            <main>
              <Route path="/carrinho/:id?" component={PaginaCarrinho} ></Route>
              <Route path="/produto/:id" component={PaginaProduto} exact></Route>
              <Route path="/produto/:id/editar" component={PaginaEdicaoProdutos} exact></Route>
              <Route path="/login" component={PaginaLogin}></Route>
              <Route path="/registro" component={PaginaRegistro}></Route>
              <Route path="/envio" component={PaginaEnvio}></Route>
              <Route path="/pagamento" component={PaginaPagamento}></Route>
              <Route path="/finalizarpedido" component={PaginaPedido}></Route>
              <Route path="/pedido/:id" component={PaginaDetalhesPedidos}></Route>
              <Route path="/historicopedidos" component={PaginaHistoricoPedidos}></Route>
              <RotaPrivada path="/perfil" component={PaginaUsuario}></RotaPrivada>
              <AdmPrivado path="/listaprodutos" component={PaginaListaProdutos}></AdmPrivado>
              <AdmPrivado path="/listapedidos" component={PaginaListaPedidosAdm}></AdmPrivado>
              <AdmPrivado path="/listausuarios" component={PaginaListaUsuariosAdm}></AdmPrivado>
              <AdmPrivado path="/usuario/:id/editar" component={PaginaEditarUsuarioAdm}></AdmPrivado>
              <Route path="/" component={PaginaInicial} exact></Route>
                
            </main>

            <footer className="row central">Todos os direitos reservados</footer>
        
        </div>
        </BrowserRouter>
    );
}

export default App;
