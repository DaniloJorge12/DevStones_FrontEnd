import { createContext, useContext, useState } from 'react';

const IdiomaContext = createContext();

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState(() => {
    return localStorage.getItem('devstone_idioma') || 'pt';
  });

  function alternarIdioma() {
    setIdioma((atual) => {
      const novo = atual === 'pt' ? 'en' : 'pt';
      localStorage.setItem('devstone_idioma', novo);
      return novo;
    });
  }

  return (
    <IdiomaContext.Provider value={{ idioma, alternarIdioma }}>
      {children}
    </IdiomaContext.Provider>
  );
}

export function useIdioma() {
  return useContext(IdiomaContext);
}