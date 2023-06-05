import React, { useContext, useState, useEffect } from 'react';
import { StudentListContext } from '../../../context/StudentListContext';
import { getGroupsFromAPI } from './service';

function SelectGroup() {
  const { groupIdSelected, setGroupIdSelected, levelNumberSelected, schoolyearIdSelected } =  useContext(StudentListContext);
  const [groupsArray, setGroupsArray] = useState([]);

  useEffect( () => {
    getGroupsFromAPI(schoolyearIdSelected, levelNumberSelected)
        .then((result)=> {
            setGroupsArray([{id: 0, number: "- SELECCIONAR"},...result]);
            setGroupIdSelected(val => val = 0);
        })
        .catch((error)=> {
          setGroupsArray([{id: -1, number: "Error"}]);
          setGroupIdSelected(val => val = -1);
          console.error("ERROR - GETGRUPOSFROMAPI: " + error);
        });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ schoolyearIdSelected, levelNumberSelected ]);

  return (
    <div className="input-group" >
       <label className="input-group-text" htmlFor="selectGrupo">Grupo:</label>
       <select 
           className="form-select" 
           name="selectGrupo" 
           onChange={(e)=>setGroupIdSelected(e.target.value)} 
           value={groupIdSelected}
           >
          { groupsArray.map((group, index) => (
             <option key={group.id} value={group.id}>{group.number}</option>))}
       </select>
     </div>
   );
}

export default SelectGroup;