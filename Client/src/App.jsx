import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produtos, setProdutos] = useState({
    nome: '',
    valor: 0.00,
    quantidade: 0,
  });
  const [busca, setBusca] = useState('');
  const [buscaPorNome, setBuscaPorNome] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProdutos({ ...produtos, [name]: value });

  };


  const saveInfo = () => {
    if (produtos.nome.trim() === '' || produtos.quantidade === 0 || produtos.valor === 0) {
      alert('Preencha todos os campos corretamente');
    } else {
      // Verifica se o produto já existe com base no nome
      axios
        .get(`http://localhost:5000/buscar?nome=${produtos.nome}`)
        .then((response) => {
          if (response.data.length > 0) {
            alert('Este produto já existe!');
          } else {
            // Se o produto não existe, então você pode salvá-lo
            axios
              .post('http://localhost:5000/salvar', produtos)
              .then(() => {
                console.log('Sucesso');
              });
          }
        });
    }
  };
  
  const getInfo = () =>{
    axios
    .get('http://localhost:5000/buscar')   
    .then((response) =>{
      setListaProdutos(response.data);
    })
  }
  const searchByName = () => {
    axios
      .get(`http://localhost:5000/buscar?nome=${buscaPorNome}`)
      .then((response) => {
        setListaProdutos(response.data);
      });
  };

  return (
    <>
      <div>
        <label>Nome</label>
        <input name="nome" onChange={handleChange} type="text" />
      </div>

      <div>
        <label>Valor</label>
        <input type="number" onChange={handleChange} name="valor" />
      </div>

      <div>
        <label>Quantidade</label>
        <input type="number" onChange={handleChange} name="quantidade" />
      </div>

      <div>
        <label>Buscar Produto por Nome</label>
        <input
          type="text"
          onChange={(e) => setBuscaPorNome(e.target.value)}
          value={buscaPorNome}
        />
        <button onClick={searchByName}>BUSCAR POR NOME</button>
      </div>

      <button onClick={saveInfo}>SALVAR</button>
      <button onClick={getInfo}>MOSTRAR</button>

      {listaProdutos.map((val, key) => {
        return (
          <div key={key}>
            <p>{val.nome}</p>
          </div>
        );
      })}
    </>
  );
}

export default App;
