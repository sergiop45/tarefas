import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill  } from 'react-icons/bs'
import './App.css';

const API = "http://localhost:5000";

function App() {

  const [tarefas, setTarefas] = useState([])
  const [tempo, setTempo] = useState("")
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")

  const handlesubmit = (e) => {
    e.preventDefault()
    
    const tarefa = {
      id: Math.random(),
      title,
      tempo,
      done: false
    }

    alert(tarefa.id)
    setTitle("")
    setTempo("")
  } 
  //loading tarefas 

  return (
    <div className="App">

      <div className="tarefa-header">
        <h1>Minhas Tarefas</h1>
      </div>

      <div className="tarefa-form">
        <h1>Insira uma Tarefa:</h1>
        <form onSubmit={handlesubmit}>
          <div className="form-control">
            <label htmlFor="title">Titulo da Tarefa: </label>
            <input name="title" type="text" value={title || ""} 
            onChange={(e) => (setTitle(e.target.value))} required></input>
            <br></br>
            <label htmlFor="tempo">Tempo da Tarefa: </label>
            <input name="tempo" type="text" value={tempo || ""} 
            onChange={(e) => (setTempo(e.target.value))} required></input>
            <br></br>
            <input type="submit" value="Criar Tarefa"></input>
          </div>
        </form>
      </div>

      <div className="tarefa-list">
        {tarefas.length === 0 && <p>Não há tarefas</p>}
      </div>
      
    </div>
  );
}

export default App;
