import React, { useState} from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none; // para quitar las apariencias permite dar css mas facil
`;
const InputRadio = styled.input`
    margin: 0 1rem;
`;
const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    //el & es para hacer referencia al mismo elemento 
    &:hover{
        cursor: pointer;
        background-color: #26c2da;
    }
`;
const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`; 

const Formulario = ({guardarResumen,guardarCargando}) => {

    const [ datos, guardarDatos ] = useState({
        marca:'',
        year:'',
        plan:'',
    });

    const [error, guardarError] = useState(false);
    // extraer datos del state
    const { marca, year, plan} = datos;
    
    // leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e =>{
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }


    //cuando el usuario presiona submit
    const cotizarSeguro = e => {
        e.preventDefault();

        if (marca.trim() === '' || year.trim() ==='' || plan.trim()==='') {
            guardarError(true);
            return;
        }
        guardarError(false);

        //base de 2000
        let resultado = 2000;
        // obtener la diferencia de a??os 
        const diferencia = obtenerDiferenciaYear(year);
        console.log(diferencia);

        //por cada a??o hay que restar 3%
        resultado -= ((diferencia * 3) * resultado) / 100;
        console.log(resultado);

        // Americano 15%
        // Asiatico 5%
        // Europeo 30%
        resultado = calcularMarca(marca) * resultado;
        console.log(resultado);
        
        // Plan basico aumenta 20 %
        // Plan completo aumenta 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat( incrementoPlan * resultado ).toFixed(2);
        console.log(resultado);

        guardarCargando(true);

        setTimeout(() =>{
            //quita el spinner
            guardarCargando(false);

            //Pasa la informacion al componente principal.
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });
        },3000);

        

    }

    return (  
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name='marca'
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value=''>--Seleccione--</option>
                    <option value='americano'>Americano</option>
                    <option value='europeo'>Europeo</option>
                    <option value='asiatico'>Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>A??o</Label>
                <Select
                    name='year'
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value=''>-- Seleccione --</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    <option value='2016'>2016</option>
                    <option value='2015'>2015</option>
                    <option value='2014'>2014</option>
                    <option value='2013'>2013</option>
                    <option value='2012'>2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                    <InputRadio
                        type='radio'
                        name='plan'
                        value='basico'
                        checked={plan === 'basico'}
                    onChange={obtenerInformacion}
                    /> Basico
                    <InputRadio
                        type='radio'
                        name='plan'
                        value='completo'
                        checked={plan === 'completo'}
                        onChange={obtenerInformacion}
                    />Completo
            </Campo>
            <Boton type='submit'>Cotizar </Boton>
        </form>
    );
}

Formulario.propTypes = {
    guardarResumen:PropTypes.func.isRequired,
    guardarCargando:PropTypes.func.isRequired,
}
 
export default Formulario;