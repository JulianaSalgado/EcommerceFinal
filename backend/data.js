import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            nome:'Juliana',
            email:'juliana.kelvin.salgado@gmail.com',
            password: bcrypt.hashSync('111', 8),
            isAdmin: true,
        },
        {
            nome:'Tatiana',
            email:'tatiana@admin.com',
            password: bcrypt.hashSync('222', 8),
            isAdmin: false,
        },
        {
            nome:'Admin1',
            email:'admin1@admin.com',
            password: bcrypt.hashSync('admin1', 8),
            isAdmin: true,
        }
    ],
    produtos:[
        {
            nome: 'vestido1',
            categoria: 'vestidos',
            imagem:'/imagens/produto1.jpeg',
            preco: 25,
            qtdStock: 10,
            marca: 'Shein',
            avaliacao:4.0,
            numReviews:10,
            descricao: 'Vestido da Shein'
        },
        {
            nome: 'vestido2',
            categoria: 'vestido',
            imagem:'/imagens/produto1.jpeg',
            preco: 27,
            qtdStock: 9,
            marca: 'Shein',
            avaliacao:4.5,
            numReviews:11,
            descricao: 'Teste produto2'
        },
        {
            nome: 'calca3',
            categoria: 'calça',
            imagem:'/imagens/produto1.jpeg',
            preco: 34,
            qtdStock: 8,
            marca: 'Shein',
            avaliacao:3.0,
            numReviews:8,
            descricao: 'Teste produto 3'
        },
        {
            nome: 'camisa4',
            categoria: 'camisa',
            imagem:'/imagens/produto1.jpeg',
            preco: 100,
            qtdStock: 7,
            marca: 'Shein',
            avaliacao:5.0,
            numReviews:20,
            descricao: 'Teste produto 4'
        },
        {
            nome: 'vestido5',
            categoria: 'vestido',
            imagem:'/imagens/produto1.jpeg',
            preco: 15,
            qtdStock: 6,
            marca: 'Shein',
            avaliacao:3.5,
            numReviews:12,
            descricao: 'Teste produto 5'
        },
        {
            nome: 'calca6',
            categoria: 'calca',
            imagem:'/imagens/produto1.jpeg',
            preco: 47,
            qtdStock: 0,
            marca: 'Shein',
            avaliacao:4.0,
            numReviews:9,
            descricao: 'Teste produto 6'
        },

    ],
};
export default data;