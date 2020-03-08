import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import client from './shared/client';
import './App.css';

function App() {
  return (
    <div className="App">
        <ApolloProvider client={client}>

        </ApolloProvider>
    </div>
  );
}

export default App;
