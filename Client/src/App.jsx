import { useState } from "react";
import "./App.css"
import axios from "axios";

function App(){

  const [nome,setNome] = useState("");
  const [idade,setIdade] = useState(0);
  const [pais,setPais] = useState("");
  const [cargo,setCargo] = useState("");
  const [salario,setSalario] = useState(0.00);

   const adicionarEmpregado = () =>{
      axios.post("http://localhost:5050/create", {nome: nome, idade: idade, pais: pais,
       cargo: cargo, salario: salario}).then(() => {
        console.log("Sucesso")
       })
   }

  const mostrarInformacoes = () =>{
    console.log("Nome:",nome);
    console.log("Idade:",idade);
    console.log("País",pais);
    console.log("Cargo:",cargo);
    console.log("Salário:",salario);
  }

  return(
    <div className="App">
      <div className="Informacao">
        <label>Nome</label>
        <input onChange={(event) => {
          setNome(event.target.value);
        }} type="text" />
        
        <label >Idade</label>
        <input onChange={(event) => {
          setIdade(event.target.value);
        }} type="number"/>

        <label>País</label>
        <input onChange={(event) => {
          setPais(event.target.value);
        }} type="text" />

        <label>Cargo</label>
        <input onChange={(event) => {
          setCargo(event.target.value);
        }} type="text" />

        <label>Salário</label>
        <input onChange={(event) => {
          setSalario(event.target.value);
        }} type="number"/>

        <button onClick={adicionarEmpregado}>Adicionar Empregado</button>
      </div>
    
    </div>
  );
}



export default App;


  // const [count,setCount] = useState(0);

  // const IncrementCount = () =>{
  //   setCount(count + 1);
  // };

  // <div className="contador">
  //     <h1>{count}</h1>
  //     <button onClick={IncrementCount}>Increment</button>
  //   </div>
