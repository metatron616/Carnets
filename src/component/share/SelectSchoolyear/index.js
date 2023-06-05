import React, { useContext, useState, useEffect } from 'react';
import { StudentListContext } from '../../../context/StudentListContext';
import { getSchoolaryearsFromAPI } from './services';

const SelectSchoolyear = () => {
  const [schoolyearsArray,setSchoolyearsArray] = useState([]);
  const { schoolyearIdSelected, setSchoolyearIdSelected } = useContext(StudentListContext);

  useEffect(() => {
      getSchoolaryearsFromAPI()
          .then((ListOfSchoolyears)=> {
         //   console.log("getSchoolaryearsFromAPI : " + result.length + JSON.stringify(result)) 
            setSchoolyearsArray(ListOfSchoolyears);
            setSchoolyearIdSelected(ListOfSchoolyears[ListOfSchoolyears.length - 1].id);
          })
          .catch((error)=> {
              setSchoolyearsArray([{id: -1, year: "Error"}]); 
              console.log("getSchoolaryearsFromAPI: " + error);
          }); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ ]);

  return (
    <div className="input-group" >
    <label className="input-group-text" htmlFor="selectCursoLectivo">Curso Lectivo:</label>
    <select 
          className="form-select" 
          name="selectCursoLectivo" 
          onChange={(e)=>{setSchoolyearIdSelected(e.target.value)}} 
          value={ schoolyearIdSelected }
          >
         { schoolyearsArray.map((schoolyear) => 
            <option key={schoolyear.id} value={schoolyear.id}>{schoolyear.year}</option>) }
      </select>
    </div>    
  );
}
export default SelectSchoolyear;