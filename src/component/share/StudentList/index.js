import React, { useState, useEffect, useContext } from 'react';
import StudentListItem from './StudentListItem';
import {getStudentsList} from './services';
import { StudentListContext } from '../../../context/StudentListContext';

function StudentList(){
    const {
        schoolyearIdSelected,groupIdSelected,levelNumberSelected,
        LoadingStudentList, setLoadingStudentList
        } = useContext(StudentListContext);

    const [studentsArray, setStudentsArray] = useState([]);

    useEffect( () => {
        setStudentsArray([]);
        setLoadingStudentList(true);
        getStudentsList(schoolyearIdSelected, levelNumberSelected, groupIdSelected)
            .then((result)=>{
                setStudentsArray(result);
                setLoadingStudentList(false)
            })
            .catch((error)=>{
                setStudentsArray([]);
                console.error(error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolyearIdSelected, levelNumberSelected, groupIdSelected]);

    return (
        <div>
            { LoadingStudentList ?
            (<div> Cargando ... </div>) : 
                     
            <div className="list-group">
                <div className="list-group-item bg-light">Estudiantes</div>
                { studentsArray.map((student, index)=> (
                    <StudentListItem  key={index} value={{index: index, ...student}} />
                )) }
            </div>
            }
        </div>
    );
}

export default StudentList;