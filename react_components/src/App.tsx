import Header from './components/header';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/notFound';
import About from './pages/about';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
