import React from 'react';
import Main from './layout/Main';
import './App.css';
import {UserProvider} from "./context/UserContext"

function App() {
  return (
    <div>
      <UserProvider>
        <Main/>
      </UserProvider>
    </div>
  );
}

export default App;
