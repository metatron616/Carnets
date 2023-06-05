import React, { useState, useContext } from 'react';
import {ToggleButton} from 'react-bootstrap';

import ButtonImageEditor from '../../button-image-button';
import CarnetButton from '../../../carnet/Carnet.Button';

import { StudentListContext } from '../../../../context/StudentListContext';

import {updateStudentHasReligion, updateStudentHasPASI, savePhotoStudent} from './service';

const StudentListItem = ({ label, value}) => {
    const {  schoolyearIdSelected } =  useContext(StudentListContext);
    const [hasReligion, setHasReligion] = useState(value.hasReligion);
    const [hasPASI, setHasPASI] = useState(value.hasPASI);
    //const [thumbnail, setThumbnail] = useState(value.photo);

    // const [photo,setphoto] = useState("");
    // const [ studentPhotoThumbnail, setStudentPhotoThumbnail] = useState();

    const onChangeHasReligion = async (hasReceive) => {
        updateStudentHasReligion({ id: value.id ,hasReligion: hasReceive})
        .then(()=>{
            setHasReligion(hasReceive)
        })
        .catch();
    }

    const onChangeHasPASI = async (hasReceive) => {
        updateStudentHasPASI({ id: value.id ,hasPASI: hasReceive})
        .then(()=>{
            setHasPASI(hasReceive)
        })
        .catch();
    }

    const onSavePhotoStudent =  async (image) => {
        savePhotoStudent({id:value.id, image: image})
            .then(async newThumbnail => {
            })
            .catch()
    }

    return(
            <div className="list-group-item list-group-item-action d-flex justify-content-start">
                <div className="pepe" > {value.index + 1} </div>
                <div className="ml-2">
                    <ButtonImageEditor thumbnail={value.photo} onTitleChange={value.firstLastname + " "+ value.secondLastname+ " " + value.name} onSave={onSavePhotoStudent} height={50} aspect={1}></ButtonImageEditor>               
                </div>
                <div className="ml-2">
                    <div className=""> {value.firstLastname + " "+ value.secondLastname+ " " + value.name} </div>
                    <div className="d-flex justify-content-start">
                        <div><CarnetButton studentId={value.id} schoolyearId={schoolyearIdSelected} /></div>
                        {' '}
                        <div>
                        <ToggleButton
                            className="mb-2 ml-2"
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-secondary"
                            checked={hasReligion}
                            value={1}
                            onChange={() => onChangeHasReligion(!hasReligion)}
                          >
                            Recibe Religion
                          </ToggleButton>
                        </div>
                            {' '}
                        <div>
                            <ToggleButton
                                className="mb-2 ml-2 btn-outline-secondary"
                                id="toggle-check"
                                type="checkbox"
                                variant="outline-secondary"
                                checked={hasPASI}
                                value={1}
                                onChange={() => onChangeHasPASI(!hasPASI)}
                            >
                                Recibe Afectividad
                            </ToggleButton>                            
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default StudentListItem;


