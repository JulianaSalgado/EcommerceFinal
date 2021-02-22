import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {detalhesProduto, produtoAtualizado} from '../acoes/produtoAcoes';
import LoadingBox from '../componentes/LoadingBox';
import MessageBox from '../componentes/MessageBox';
import { PRODUTO_ATUALIZAR_RESET } from '../constants/produtoConstantes';

export default function PaginaEdicaoProdutos(props){
    const produtoId = props.match.params.id;
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagem, setImagem] = useState('');
    const [preco, setPreco] = useState('');
    const [qtdStock, setQtdStock] = useState('');
    const [marca, setMarca] = useState('');
    const [descricao, setDescricao] = useState('');
   
    const produtoDetalhes = useSelector((state) => state.produtoDetalhes);
    const {loading, error, produto} = produtoDetalhes;

    const produtoAtualizacao = useSelector((state)=> state.produtoAtualizacao);
    const {loading: loadingAtualiza , error: errorAtualiza, success: successAtualiza} = produtoAtualizacao;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(successAtualiza){
            
            props.history.push('/listaprodutos');
        }
        if(!produto || produto._id !== produtoId || successAtualiza){
            dispatch({type: PRODUTO_ATUALIZAR_RESET});
            dispatch(detalhesProduto(produtoId));
        }else{
            setNome(produto.nome);
            setCategoria(produto.categoria);
            setImagem(produto.imagem);
            setPreco(produto.preco);
            setQtdStock(produto.qtdStock);
            setMarca(produto.marca);
            setDescricao(produto.descricao);
        }
    }, [produto, dispatch, produtoId ]);

    const submeter =(e) =>{
        e.preventDefault();
        dispatch(
            produtoAtualizado({_id: produtoId, nome, preco, imagem, categoria, marca, qtdStock, descricao}));
    };

    const [CarregarImagem, setCarregarImagem] = useState(false);
    const [errorCarregarImagem, setErrorCarregarImagem] = useState('');

    const userLogin = useSelector((state)=> state.userLogin);
    const {userInfo} = userLogin;

    const subirImagem = async(e) =>{
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('imagem', file);
        setCarregarImagem(true);
        try{
            const {data} = await Axios.post('/api/fotos', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${userInfo.token}`,},
            });
            setImagem(data);
            setCarregarImagem(false);
        }catch(error){
            setErrorCarregarImagem(error.message);
            setCarregarImagem(false);
        }
    };

    return(
        <div>
            <form className="formulario" onSubmit={submeter}>
                <div><h1>Editar produto {produtoId}</h1></div>
                {loadingAtualiza && <LoadingBox></LoadingBox>}
                {errorAtualiza && <MessageBox variant="perigo">{errorAtualiza}</MessageBox>}
                {
                    loading ? (<LoadingBox></LoadingBox>)
                    : error ? (<MessageBox variant="perigo">{error}</MessageBox>)
                    : (<>
                    
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input id="nome" type="text" 
                            placeholder="Digite o nome"
                            value={nome}
                            onChange={(e)=> setNome(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor="categoria">Categoria</label>
                        <input id="categoria" type="text" 
                            placeholder="Digite a categoria"
                            value={categoria}
                            onChange={(e)=> setCategoria(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor="imagem">Imagem</label>
                        <input id="imagem" type="text" 
                            placeholder="Insira a imagem"
                            value={imagem}
                            onChange={(e)=> setImagem(e.target.value)}>
                        </input>

                    </div>
                    <div>
                        <label htmlFor="arquivoImagem">Imagem Arq</label>
                        <input type="file" 
                                id="arquivoImagem" 
                                label="Escolha a Imagem" 
                                onChange={subirImagem}>
                        </input>
                        {CarregarImagem && <LoadingBox></LoadingBox>}
                        {errorCarregarImagem && <MessageBox variante="perigo">{errorCarregarImagem}</MessageBox>}

                    </div>


                    <div>
                        <label htmlFor="preco">Preco</label>
                        <input id="preco" type="text" 
                            placeholder="Digite o preco"
                            value={preco}
                            onChange={(e)=> setPreco(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor="qtdStock">Estoque</label>
                        <input id="qtdStock" type="text" 
                            placeholder="Digite a quantidade"
                            value={qtdStock}
                            onChange={(e)=> setQtdStock(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor="marca">Marca</label>
                        <input id="marca" type="text" 
                            placeholder="Digite a marca"
                            value={marca}
                            onChange={(e)=> setMarca(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor="descricao">Descricao</label>
                        <textarea id="descricao" type="text" 
                            rows="4"
                            placeholder="Digite descricao"
                            value={descricao}
                            onChange={(e)=> setDescricao(e.target.value)}>
                        </textarea>
                    </div>
                    <div>
                        <label></label>
                        <button className="primario" type="submit">Atualizar</button>
                    </div>
                    </>

                )}
            </form>
        </div>
    )
};