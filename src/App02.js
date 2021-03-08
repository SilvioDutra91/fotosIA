import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Robot } from "../src/images/robotics.svg"
import Carregando from '../src/images/Spinner-1s-200px.gif'

function App() {
  //JSX - Extensão de Sintaxe JavaScript
  //Hooks - useState (facilitador para getter/setter)
  const [pessoas, setPessoas] = useState([]) //[]inicializa com uma matriz
  const [carregando, setCarregando] = useState(false)

  function ListaPessoas(props) {
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]}
        title="Pessoa gerada via IA" alt="pessoa gerada via IA" />
    )
    return (
      <>{listagemPessoas}</>
    )

  }

  async function obtemFoto() {
    setCarregando(true)
    let chaveAPI = 'JVFWCa0amkpT8jN6oZ89-w'
    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces)
      })
      .catch(function (error) {
        console.error('Houve um erro na requisição' + error.message)
      })
    setCarregando(false)
  }


  return (
    <div className="app">
      <h1> Gerador de Fotos com IA</h1>
      <Robot />
      {carregando &&
        <img src={Carregando} title="Aguarde..." alt="Aguarde" width="50" />
      }
      <div className='fotos'>

        <ListaPessoas pessoas={pessoas} />
      </div>
      <div className='fotos'>
        <button type='button' onClick={obtemFoto}>
          Obter Imagens
      </button>
          <button type='button' onClick={() => setPessoas ([])}>
          Limpar imagens
      </button>
      </div>
    </div>
  )
}

export default App;