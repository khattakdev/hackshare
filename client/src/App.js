import React from 'react';
import Components from './router'
import Header from './layout/Header'
import Footer from './layout/Footer'
import './App.css';

const App = () => {
    return (
      <>
        <Header />
        <main>
          <Components />
        </main>
        <Footer />
      </>
    );
}

export default App;
