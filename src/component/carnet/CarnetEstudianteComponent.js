/**
 *Componente Carnet SVG
 */
import React, { useState, useEffect } from 'react';
import  './Carnet.css';
import makeIDCard from './makeCarnet';

function CarnetEstudianteComponent(props) {

    const [svgFinal, setSvgFinal] = useState("");

    useEffect(    () => {
        async function fetchData() {
            setSvgFinal('loading');      
            setSvgFinal( await makeIDCard (props.data));
        }
        fetchData();
    },[props.data]);
    
    return (
        <div dangerouslySetInnerHTML={{ __html: svgFinal }} id="carnet-container"/>
    );
}
  
export default CarnetEstudianteComponent;