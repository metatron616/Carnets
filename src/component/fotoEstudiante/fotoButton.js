import React, { useState, useEffect, useContext } from 'react';
import Image from "react-bootstrap/Image";
import ImageModal from './fotoEstudiante.Modal';
import StudentPhotoContextProvider from './context/student-photo.contexprovider';
import { StudentPhotoContext } from './context/student-photo.context';
import './Foto.css';
//import axios from 'axios';
//import { APIServerURL } from '../../config.json';


function ImageButton(height, width, src, onSave) {
    const { 
        schoolyearIdSelected, setSchoolyearIdSelected
    } = useContext(StudentListContext);


    const { 
        showTakePhotoModal, setShowTakePhotoModal,
        imageThumbnail, setImageThumbnail
    } = useContext(StudentPhotoContext);

    const [showModal, setShowModal] = useState(false);
    const [imageRaw, setImageRaw] = useState(null);
  
      //const hiddenFileInput = React.useRef(null);
    useEffect( () => { 
        setImageThumbnail(src);
    },[ ]);

    const setImage= (value) => {
        setImageRaw(value);
        props.onChangePhoto(value);
    }

    //const changeShowModal = (event) => {
    //    setShowModal(event);
    //}
    
    const onClick = async event => {
 
    };

    return (
        <StudentPhotoContextProvider>
             <button className='btn btn-primary' onClick={onClick} >
                <Image className="photoThumbnail" src={imageThumbnail}    />         
            </button>
            <ImageModal value={props.value} callBack={onSave} />     
        </StudentPhotoContextProvider>
    );
}

export default ImageButton;