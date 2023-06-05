import React, { useState, useRef,useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cropper  from 'react-easy-crop';
import {getCroppedImg, getResizeImage} from '../../../utils/canvasUtils';
import './style.css';

const ButtonImageEditor = ({ thumbnail, title, onSave, height, aspect=1 }) => {

  const [showModal, setShowModal] = useState(false);
  const [imageThumbnail, setImageThumbnail] = useState(thumbnail)
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const width = height * aspect;
  const hiddenFileInput = useRef(null);

  const handleModalOpen = () => { 
    hiddenFileInput.current.value = null;

    hiddenFileInput.current.click(); 
    setShowModal(true);
    setImage(null);
  }

  const handleModalClose = () => {
    hiddenFileInput.current.value = null;
    setShowModal(false);
    setImage(null);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file !== undefined){
      const reader = new FileReader();
      reader.onload = async () => {
        await setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    else{handleModalClose(); throw new Error("No se guardó la foto")}

  };

  const handleSave = () => {
    return new Promise(async ()=>{
      const croppedImage =  await getCroppedImg(image, croppedAreaPixels, rotation);

      if (!croppedImage || typeof croppedImage === 'undefined') throw new Error("Error al recortar la imagen")
     // console.log("CroppedImage: " + croppedImage)
     // console.log("Imagen cortada" + JSON.stringify(croppedImage));
      const newThumbnail = await getResizeImage(croppedImage, width)
      // Do something with the cropped image
       onSave(croppedImage)
        .then(()=>{
          console.log(newThumbnail)
          setImageThumbnail(newThumbnail);
        })
        .catch((error)=>{console.error(error)});
          handleModalClose();
    });

  };

  const onCropComplete = useCallback((croppedArea, _croppedAreaPixels) => {
    setCroppedAreaPixels(_croppedAreaPixels)
  }, []);

  return (
    <>
        <Button variant="primary" onClick={handleModalOpen}>
            <img src={imageThumbnail} alt="Thumbnail" width={width} height={height}/>
        </Button>
        <input 
            type="file" 
            ref={hiddenFileInput}
            onChange={handleImageChange} 
            style={{display:'none'}}
            accept="image/*"
        />
        <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div><h1>{title}</h1></div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  aspect={aspect}
                />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};
export default ButtonImageEditor;