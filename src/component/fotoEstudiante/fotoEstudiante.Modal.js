import React, {useState, useCallback, useEffect} from "react";


import {Button, Modal} from 'react-bootstrap';

import Cropper from "react-easy-crop";

import { MdRotateLeft } from 'react-icons/md';
import { MdRotateRight } from 'react-icons/md';
import { MdOutlineSave } from 'react-icons/md';
import { MdOutlineCameraAlt} from 'react-icons/md';
import {MdOutlineClose} from 'react-icons/md';

import './Foto.css';
import { APIServerURL } from '../../config.json';
import axios from 'axios';
import { StudentPhotoContext } from "./context/student-photo.context";
import StudentPhotoContextProvider from "./context/student-photo.contexprovider";

const EditImageModal = (onSaveImage, value) => {

  const { 
    showTakePhotoModal, setShowTakePhotoModal,
    imageThumbnail, setImageThumbnail
} = useContext(StudentPhotoContext);
  //const [showModal, setShowModal] = useState(false);
  //const [image,setImage] = useState("");

  useEffect( () => {
    //setShowModal(showModal);
    //setImage( image);      
  },[ image, showModal, changeShowModal]);

    const [crop, setCrop] = useState({ x: 0, y: 0 }) ;
    const [rotation, setRotation] = useState(0) ;
    // const [flip, setFlip] = useState({ horizontal: false, vertical: false }) ;
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1 / 1);
    const [cropShape, setCropShape] = useState("rect");
    const [showGrid,setShowGrid] = useState(true);
    const [zoomSpeed, setZoomSpeed] = useState(1);
    const [restrictPosition, setRestrictPosition] = useState(true);
    const [croppedArea, setCroppedArea] = useState(null);
    const [croppedImageSize, setCroppedImageSize] = useState("small");  
 

  const onCropChange = useCallback(async (_crop) => {
    await setCrop(_crop);
  },[crop]);

  const onCropComplete = useCallback(async(_croppedArea, _croppedAreaPixels) => {
    console.log(_croppedArea, _croppedAreaPixels);
    await setCroppedArea(_croppedArea);
  },[croppedArea]);

  const onInteractionStart = () => {
    console.log("user interaction started");
  };
  const onInteractionEnd = () => {
    console.log("user interaction ended");
  };


  const rotateLeft = useCallback(async () => {
    await setRotation(rotation - 90);
  }, [rotation]);

  const rotateRight = useCallback(async () => {
    await setRotation(rotation + 90);
  }, [rotation]);

  const handleClose = () => {
    setShowModal(false); //onChange(false);
    changeShowModal(false);
  };
  const hiddenFileInput = React.useRef(null);

  const onClick = event => {
      hiddenFileInput.current.click();
  };

  const handleChangeFileImage = async (event) => {
      event.preventDefault();

          const reader =  new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.addEventListener('load', async () => {
            console.log("Image from file: " + reader.result);
              await setImage(reader.result); //Se envia la imagen en base64
          });
          console.log(reader);
  };
  // const saveCroppedImage = useCallback(async () => { });

  return (        
      <Modal 
        show={showModal}
        onHide={handleClose}
      >
         <Modal.Header closeButton>
            <Modal.Title><div>Foto de Estudiante</div>  <div> {value.apellidos + " " + value.nombre}</div></Modal.Title>      
          </Modal.Header>

          <Modal.Body> 
              <div>
              <Cropper
                image={image}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={aspect}
                cropShape={cropShape}
                showGrid={showGrid}
                zoomSpeed={zoomSpeed}
                restrictPosition={restrictPosition}
                onCropChange={onCropChange}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onCropAreaChange={setCroppedArea}
                onZoomChange={setZoom}
                onInteractionStart={onInteractionStart}
                onInteractionEnd={onInteractionEnd}
              />
             </div>
          </Modal.Body>

          <Modal.Footer>
          <Button variant="primary" onClick={onClick}>  <MdOutlineCameraAlt size={32}/> </Button>
          <input type="file"
                ref={hiddenFileInput}
                onChange={handleChangeFileImage}
                style={{display:'none'}} 
                accept="image/*"
            /> 
            <Button variant= "secundary" onClick={rotateLeft}>  <MdRotateLeft size={32}/> </Button>
            <Button variant= "secundary" onClick={rotateRight}> <MdRotateRight size={32}/> </Button>
            <Button variant="primary" onClick={onSaveImage}> <MdOutlineSave size={32}/> </Button> 
            <Button variant="secondary" onClick={handleClose}> <MdOutlineClose size={32}/> </Button>
          </Modal.Footer>
         </Modal>
    );
}

export default EditImageModal;

