import React from 'react';
import { FaSearch } from 'react-icons/fa';

import BarraSeleccionGrupo from '../../component/share/BarraSeleccionGrupo';
import StudentList from '../../component/share/StudentList';
import StudentListContextProvider from '../../context/StudentListContextProvider';

const CarnetsEstudiantes = () => {
    return (
        <StudentListContextProvider>
            <div className="FiltroEstudiantes">
                <div className=" bg-light">
                    <div className="container-fluid ">
                        <div><span className="mb-0 h4">Carnets Estudiantes</span></div>
                    </div>
                    <BarraSeleccionGrupo className=""/>
                </div>  
                <div>
                    <div className="input-group" >
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><FaSearch /></span>
                        </div>                    
                        <input type="text" className="form-control" placeholder="Buscar" onChange = {()=> {return ""}} />
                    </div>      
                </div> 
                <div  className="row justify-content-start h-auto mt-xs-10">
                    <div className="col col-sm-12 col-md" >
                        <StudentList key='StudentList'/>
                    </div>
                </div>
            </div>
        </StudentListContextProvider>
    );
}

export default CarnetsEstudiantes;