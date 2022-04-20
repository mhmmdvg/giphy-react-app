import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Trending from './pages/trending/Trending';
import Search from './pages/search/Search';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
