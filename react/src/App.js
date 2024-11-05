import './App.css';
import React from 'react'
import { useState } from 'react'
import axios from 'axios';

function App() {
  const [text, setText] = useState('')
  const [pokemon, setPokemon] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [response, setResponse] = useState('')

  function handleChange(e, target){
    if (target == "text") {
      setText(e.target.value)
    } else if (target == "pokemon") {
      setPokemon(e.target.value)
    } else if (target == "email") {
      setEmail(e.target.value)
    } else if (target == "password") {
      setPassword(e.target.value)
    }
  }

  const handleSimpleGet = async () => {
    try {
      const res = await axios.get('http://localhost:5001/v1/simple-get');
      setResponse(res.data);
    } catch (error) {
      setResponse('Error in Simple Get: ' + error);
    }
  };

  const handleDynamicGet = async () => {
    try {
      const res = await axios.get('http://localhost:5001/v1/dynamic-get/' + text);
      setResponse(res.data);
    } catch (error) {
      setResponse('Error in Dynamic Get: ' + error);
    }
  };

  const handlePokemonGet = async () => {
    try {
      const res = await axios.get('http://localhost:5001/v1/pokemon/' + pokemon);
      const { name, id, height, weight } = res.data;
      setResponse('Name: ' + name + ' ID: ' + id + ' Height: ' + height + ' Weight: ' + weight);
    } catch (error) {
      setResponse('Error fetching Pokemon: ' + error);
    }
  };

  const handleAddUser = async () => {
    try {
      const res = await axios.post('http://localhost:5001/v1/add-user', { email, password });
      setResponse(res.data);
    } catch (error) {
      console.error('Error adding user:', error);
      setResponse('Error adding user');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="response-box">{response}</div>
        <button onClick={handleSimpleGet}>Simple Get</button>
        <input type="text" value={text} onChange={(e) => handleChange(e, "text")} placeholder="text" />
        <button onClick={handleDynamicGet}>Dynamic Get</button>
        <input type="text" value={pokemon} onChange={(e) => handleChange(e, "pokemon")} placeholder="pokemon" />
        <button onClick={handlePokemonGet}>Pokemon</button>
        <input type="text" value={email} onChange={(e) => handleChange(e, "email")} placeholder="email" />
        <input type="text" value={password} onChange={(e) => handleChange(e, "password")} placeholder="password" />
        <button onClick={handleAddUser}>Add User</button>
      </header>
    </div>
  );
}

export default App;