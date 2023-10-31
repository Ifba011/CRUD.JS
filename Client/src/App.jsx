  import { useState } from "react";
  import axios from "axios";
  import './App.css'

  function App() {
    
    const [produto,setProduto] = useState({
      nome: '',
      valor: 0.00,
      quantidade: 0
    })

    const [listaprodutos,setListaProdutos] = useState([])



    const salvar = () =>{
      const dados = ({
        nome: document.getElementById('inpNome').value,
        valor: document.getElementById('inpValor').value,
        quantidade: document.getElementById('inpQuantidade').value,

      })

      setProduto(dados);

      axios
      .post('http://localhost:5000/salvar', produto)
      .then((response) =>{console.log(response.data)})
    }

    const buscar  = () =>{
      axios
      .get('http://localhost:5000/buscar')
      .then((response) => {
        const dadosRecebidos = ({
          nome: response.data[0].nome,
          valor: response.data[0].valor,
          quantidade: response.data[0].quantidade,
        })

        setListaProdutos(response.data)
              
      })
    }

    // const handleChange = (event) => {
    //   const { name, value } = event.target;
    //   setEmpregado({ ...empregado, [name]: value });
    //   console.log(empregado.nome)
    // };

    return (
      <>
        <div>
          <label>Nome:</label>
          <input type="text" id="inpNome" />
        </div>

        <div>
          <label>Valor:</label>
          <input type="number" id="inpValor"/>
        </div>

        <div>
          <label>Quantidade:</label>
          <input type="number" id="inpQuantidade" />
        </div>
        
        <div>
          <button onClick={salvar}>Salvar</button>
          <button onClick={buscar}>Buscar</button>
          <button onClick={() =>{console.log(produto.nome)}}>teste</button>
        </div>

        <div>
        <h2>Produtos no Banco de Dados:</h2>
        <ul>
          {listaprodutos.map((produto, index) => (
            <p key={index}>
              Nome: {produto.nome},
              Valor: {produto.valor}, 
              Quantidade: {produto.quantidade}
            </p>
          ))}
        </ul>
      </div>

        
      </>
    );

  };
  export default App;
