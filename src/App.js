import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill  } from 'react-icons/bs'
import './App.css';

const API = "http://localhost:4000";

function App() {

  const [tarefas, setTarefas] = useState([])
  const [tempo, setTempo] = useState("")
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [contador, setContador] = useState(0)

  const handlesubmit = async (e) => {
    setContador(contador + 1)
    e.preventDefault()
    
    const tarefa = {
      id: contador,
      title,
      tempo,
      done: false
    }

    await fetch(API + "/tarefas", {
      method: "POST",
      body: JSON.stringify(tarefa),
      headers: {
        "content-type":"application/json"
      },
    });

    setTarefas((prevState) => [...prevState, tarefa])
    
    setTitle("")
    setTempo("")
  } 
  //loading tarefas 

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
  
      const res = await fetch(API + "/tarefas").then((res) => res.json())
      .then((data) => data).catch((err) => console.log("erro "+err));

      setLoading(false)

      setTarefas(res)
  
    }

    loadData()
  }, [])

  const handleDelete = async (id) => {
      await fetch(API + "/tarefas/" + id, {
      method: "DELETE",
    });

    setTarefas((prevState) => prevState.filter((tarefa) => tarefa.id != id));
  }
  
  const handleEdit = async (tarefa) => {
    tarefa.done = !tarefa.done

    const data = await fetch(API + "/tarefas/" + tarefa.id, {
      method: "PUT",
      body: JSON.stringify(tarefa),
      headers: {
        "Content-Type": "application/json",
      }
    })

    setTarefas((prevState) => prevState.map((t) => (t.id === data.id ? (t = data) : t)));
  }



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
        <h2>Lista de Tarefas</h2>
        {tarefas.length === 0 && <p>Não há tarefas</p>}
        {tarefas.map((tarefa) => (
          <div key={tarefa.id} className="tarefa">
            <h3 className={tarefa.done ? "tarefa-done" : ""} >{tarefa.title}</h3>
            <p>Duração: {tarefa.tempo} Hrs</p>
            <div className="actions">
              <span onClick={() => handleEdit(tarefa)}>
                {!tarefa.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(tarefa.id)} />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
