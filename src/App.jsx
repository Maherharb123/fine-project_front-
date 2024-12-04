import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './ui/Nav';

function App() {
  return (
    <div>
      <Nav />
      <h1>Welcome to My Online Store</h1>
      <Outlet />
    </div>
  );
}

export default App;
