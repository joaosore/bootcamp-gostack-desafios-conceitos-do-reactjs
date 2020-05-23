import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get(`repositories`).then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repositorie = await api.post(`repositories`, {
      "title": `Repositório ${Date.now()}`,
      "url": "https://github.com/Rocketseat/umbriel",
      "techs": ["Node", "Express", "TypeScript"]
    });
    setRepositories([...repositories, repositorie.data], []);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    const repositorieIndex = repositories.findIndex(p => p.id === id);
    if(repositorieIndex >= 0) {
      repositories.splice(repositorieIndex, 1);
    }
    setRepositories([...repositories], []);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(value => (
          <li key={value.id}>
          {value.title}
          <button onClick={() => handleRemoveRepository(value.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
