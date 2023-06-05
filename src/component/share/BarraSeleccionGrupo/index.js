import React from 'react';
import SelectSchoolyear from '../SelectSchoolyear';
import SelectLevel from '../SelectLevel';
import SelectGroup from '../SelectGroup';

function BarraSeleccionGrupo () {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className=" container-fluid" >
                <form className="  row  gy-2 gx-3 justify-content-start">
                    <div className="col-auto">
                        <SelectSchoolyear />  
                    </div>
                    <div className="col-auto">
                        <SelectLevel />     
                    </div>    
                    <div className="col-auto">
                        <SelectGroup />     
                    </div>
                </form>
            </div>
        </nav>
    );
}

export default BarraSeleccionGrupo;