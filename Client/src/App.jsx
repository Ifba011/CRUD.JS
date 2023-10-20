import { useState } from "react";
import axios from "axios";

function App() {
  const [empregado, setEmpregado] = useState({
    nome: "",
    idade: 0,
    pais: "",
    cargo: "",
    salario: 0.0,
  });

  const [listaEmpregados, setListaEmpregados] = useState([]);

  const adicionarEmpregado = () => {
    axios
      .post("http://localhost:5000/create", empregado)
      .then(() => {
        console.log("Sucesso");
        
        // Limpe cada campo de entrada individualmente
        const inputFields = document.querySelectorAll('input');
        inputFields.forEach(input => {
          input.value = "";
        });
      });
  };
    
  

  const listarEmpregados = () => {
    axios.get("http://localhost:5000/empregados").then((response) => {
      setListaEmpregados(response.data);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmpregado({ ...empregado, [name]: value });
    console.log(empregado.nome)
  };

  return (
    <>
      <div className="informacoes">
        <label>Nome</label>
        <input name="nome" onChange={handleChange} type="text" />

        <label>Idade</label>
        <input name="idade" onChange={handleChange} type="number" />

        <label>País</label>
        <input name="pais" onChange={handleChange} type="text" />

        <label>Cargo</label>
        <input name="cargo" onChange={handleChange} type="text" />

        <label>Salário</label>
        <input name="salario" onChange={handleChange} type="number" />

        <button onClick={adicionarEmpregado}>Adicionar</button>
      </div>

      <hr />
      <div className="mostrar">
        <button onClick={listarEmpregados}>Mostrar empregados</button>
        {listaEmpregados.map((val, key) => {
          return (
            <div className="card" key={key}>
              <div>
                <p>{val.nome}</p>
                <p>{val.cargo}</p>
                <p>{val.salario}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;