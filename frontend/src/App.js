import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './shared/client';
import './App.css';
import { MainView } from './views/main';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <MainView />
      </ApolloProvider>
    </div>
  );
}

export default App;
