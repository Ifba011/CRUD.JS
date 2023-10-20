const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database:"sistemaempregados"
});

app.post("/create",(req,res) =>{
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const salario = req.body.salario;

    db.query("INSERT INTO empregados (nome, idade, pais, cargo, salario) VALUES (?,?,?,?,?)", [nome, idade, pais, cargo, salario], 
    (err,result) => {
            if(err){
                console.log(err);
            } 
            else{
                res.send("Valores Salvos");
            }
        }
    );

});


app.get("/empregados",(req,res) =>{
    db.query("SELECT * FROM empregados",(err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})




app.listen(5000,() =>{
    console.log("Servidor iniciado em http://localhost:5000/");
})