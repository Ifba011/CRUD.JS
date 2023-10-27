const express = require('express');
const App = express();
const mysql = require('mysql');
const cors = require('cors');

App.use(cors());
App.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'produtos'
});

App.post('/salvar',(req,res)  =>{
    const nome = req.body.nome;
    const valor = req.body.valor;
    const quantidade = req.body.quantidade;

    db.query('INSERT INTO produtos (nome, valor, quantidade) VALUES (?,?,?)',
    [nome,valor,quantidade], (err,response) =>{
        if(err){
            console.log(err);
        }

        else{
            res.send(console.log('Sucesso'))
        }
    })
})

App.get('/buscar', (req, res) => {
    const nome = req.query.nome; // Recupera o parâmetro "nome" da solicitação
  
    if (nome) {
      // Se o parâmetro "nome" estiver presente, realiza uma busca com base no nome
      const query = `SELECT * FROM produtos WHERE nome LIKE ?`; // Substitua 'produtos' pelo nome da sua tabela
  
      db.query(query, [`%${nome}%`], (err, results) => {
        if (err) {
          console.error('Erro ao consultar o MySQL: ' + err);
          res.status(500).json({ error: 'Erro interno do servidor' });
          return;
        }
  
        res.json(results);
      });
    } else {
      // Se o parâmetro "nome" não estiver presente, você pode executar uma busca semelhante que retorna todos os produtos (ajuste conforme necessário).
      const query = `SELECT * FROM produtos`; // Substitua 'produtos' pelo nome da sua tabela
  
      db.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao consultar o MySQL: ' + err);
          res.status(500).json({ error: 'Erro interno do servidor' });
          return;
        }
  
        res.json(results);
      });
    }
  });

App.listen(5000,() =>{
    console.log('Iniciado na porta 5000')
})

