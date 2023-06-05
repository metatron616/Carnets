import React, { useContext, useEffect,useState } from 'react';
import { StudentListContext } from '../../../context/StudentListContext';
import { getLevelsFromAPI } from './service';

const SelectLevel = () => {
  const { levelNumberSelected, setLevelNumberSelected, schoolyearIdSelected } =  useContext(StudentListContext);
  const [levelsArray, setLevelsArray] = useState([]);

  useEffect( () => {
    getLevelsFromAPI(schoolyearIdSelected)
        .then((ListOfLevels)=> {
           // console.log(schoolyearIdSelected)
            setLevelsArray([{levelNumber: 0, name: "- SELECCIONAR"}, ...ListOfLevels]);
            setLevelNumberSelected(0)
        })
        .catch((error)=> {
           setLevelsArray([{levelNumber: -1, name: "Error"}]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ schoolyearIdSelected ]);

  return (
    <div className="input-group" >
       <label className="input-group-text" htmlFor="selectNivel">Nivel:</label>
       <select 
           className="form-select" 
           name="selectNivel" 
           onChange={(e)=>{setLevelNumberSelected(e.target.value)}}
           value={levelNumberSelected}
           >
          { levelsArray.map((level) =>  
             <option key={level.levelNumber} value={level.levelNumber}>{level.name}</option>)}
       </select>
     </div>
   );
}

export default SelectLevel;