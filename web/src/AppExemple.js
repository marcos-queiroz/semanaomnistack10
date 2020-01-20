import React, { useState } from 'react';

// componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// propriedade: Informações que um componente PAI passa para o componente FILHO
// estado: Informações mantidas pelo componente (Lembrar: conceito imutabilidade)

function AppExemple() {
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
  }

  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

export default AppExemple;
