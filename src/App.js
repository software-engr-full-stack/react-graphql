import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';

import api from './api/index';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    api().then((apiData) => {
      setData(apiData);
    });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React GraphQL
        </p>
        <pre>
          {
            data.users.map(({ name, id, resources }) => (
              <div key={id}>
                {name}: [
                {
                  resources.map((res, ix) => (
                    <span key={res.id}>
                      {res.name}{ ix < (resources.length - 1) ? ', ' : '' }
                    </span>
                  ))
                }
                ]
              </div>
            ))
          }
        </pre>
      </header>
    </div>
  );
}

export default App;
