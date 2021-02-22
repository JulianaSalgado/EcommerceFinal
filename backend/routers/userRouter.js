import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModelo.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
     await User.remove({});
      const createdUsers = await User.insertMany(data.users);
      res.send({ createdUsers });
    })
  );

userRouter.post('/login', expressAsyncHandler(async(req,res)=> {
  const user =  await User.findOne({email: req.body.email});
  if(user){
    if (bcrypt.compareSync(req.body.password, user.password)){
      res.send({
        _id: user._id,
        nome: user.nome,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
    res.status(401).send({message: 'Email ou senha invalidos'});
})
);

userRouter.post('/registro', expressAsyncHandler(async(req,res)=>{
  const user = new User({
    nome:req.body.nome, 
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password, 8),
  });
  const createdUsers = await user.save();
  res.send({
    _id: user._id,
    nome: user.nome,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(createdUsers),
  });
}));

userRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);
  if(user){
    res.send(user);
  } else {
    res.status(404).send({message: 'Usuario nao encontrado'});
  }
}));

userRouter.put('/perfil', isAuth, expressAsyncHandler(async(req,res) =>{
  const user = await User.findById(req.user._id);

  if(user){
    user.nome= req.body.nome || user.nome;
    user.email= req.body.email || user.email;
    if(req.body.password){
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const userAtualizado = await user.save();
    res.send({
      _id: userAtualizado._id,
      nome: userAtualizado.nome,
      email: userAtualizado.email,
      isAdmin: userAtualizado.isAdmin,
      token: generateToken(userAtualizado),

    });
  }
}));

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
  const users= await User.find({});
  res.send(users);
}));

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);

  if(user){

    if(user.email === 'juliana.kelvin.salgado@gmail.com'){
      res.status(400).send({message:'Nao é permitido deletar administrador'});
      return;
    }
    const deletarUser = await user.remove();
    res.send({message:'Usuario deletado com sucesso', user:deletarUser});
  }else{
    res.status(404).send({message:'Usuario nao encontrado'});
  }
}));

userRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);

  if(user){
    user.nome = req.body.nome || user.nome;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const userAtualizado = await user.save();

    res.send({message: 'Usuario atualizado', user: userAtualizado});
  }
  else{
    res.status(404).send({message: 'Usuario nao encontrado'});
  }
}));

export default userRouter;