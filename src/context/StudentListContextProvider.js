import { useState } from "react";
import { StudentListContext } from "./StudentListContext";
const StudentListContextProvider = ({children}) => {
    const [schoolyearIdSelected, setSchoolyearIdSelected] = useState(0);
    const [levelNumberSelected, setLevelNumberSelected] = useState(0);
    const [groupIdSelected, setGroupIdSelected] = useState(0);
    const [studentTextFilter, setStudentTextFilter] = useState("");
    const [studentSelected, setStudentSelected] = useState("");
    const [LoadingStudentList, setLoadingStudentList] = useState(true);

    return (
        <StudentListContext.Provider  
            value={{
                schoolyearIdSelected, setSchoolyearIdSelected, 
                levelNumberSelected,setLevelNumberSelected,
                groupIdSelected, setGroupIdSelected,
                studentTextFilter, setStudentTextFilter,
                studentSelected, setStudentSelected,
                LoadingStudentList, setLoadingStudentList
            }} 
        >
            {children}
        </StudentListContext.Provider>
    );
};

export default StudentListContextProvider;