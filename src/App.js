import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: "Projeto Pizzaria",
      url:"https://github.com/LeonardoCHb/Projeto_Pizzaria.git",
      techs:["Node.js", "React", "Bootstrap"]
    })
    const newRepository = response.data;
    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {

    const indexRepository = repositories.findIndex(repository => repository.id === id)
    const newRepositories = [...repositories]

    newRepositories.splice(indexRepository, 1);

    setRepositories(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (<li key={repository.id}>
                  {repository.title}
                  <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                  </li>)
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
