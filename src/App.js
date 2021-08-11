import React, { useState} from 'react';
import Header from "./components/Header";
import Foermulario from "./components/Formulario";
import styled  from '@emotion/styled';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const ContenedorFormulario = styled.div`
  background-color: #ffffff;
  padding: 3rem;
`;

function App() {
  const [ resumen, guardarResumen ] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  //state que se va a usar para el spinner
  const [ cargando, guardarCargando] = useState(false);
  
  // Extraer datos 
  const { cotizacion, datos } = resumen;

  return (
    <Contenedor>
      <Header 
        titulo='Cotizador de seguros'
      />
      <ContenedorFormulario>
        <Foermulario
          guardarResumen={guardarResumen}
          guardarCargando={guardarCargando}
        />
        {cargando ? <Spinner /> : null}
        
        <Resumen 
          datos = { datos }
        />

        {!cargando ? 
          <Resultado 
            cotizacion = { cotizacion }
          /> : null
        }
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
