const express = require("express")
const App = express()
const mysql = require("mysql")
const cors = require("cors")

App.use(cors());
App.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "sistemaempregados"
});

App.post('/create',(req,res) =>{
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const salario = req.body.salario;

    db.query("INSERT INTO empregados (nome, idade, pais, cargo, salario) VALUES (?,?,?,?,?)",
     [nome, idade, pais, cargo, salario], (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Valores salvos")
        }
     }
    );

});

App.listen(5050,() =>{
    console.log("Servidor iniciado em http://localhost:5050/");
});