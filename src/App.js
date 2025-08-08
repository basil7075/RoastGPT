import React from 'react';
import './App.css';
import RoastBox from './components/RoastBox';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>RoastGPT</h1>
        <p>We'll give you emotional support... but not before an insult.</p>
      </header>
      <main>
        <RoastBox />
      </main>
    </div>
  );
}

export default App;
