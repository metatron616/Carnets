import React, { useState, useEffect } from 'react';
import {Button, Modal} from 'react-bootstrap';
// import { transform } from '@svgr/core'

import CarnetSVG from './CarnetEstudianteComponent';
import axios from 'axios';
import PHE from 'print-html-element';
import {APIServerURL} from '../../config.json';

function CarnetModal({id,schoolyearId, show, onChange}) {

  const [dataCarnet, setDataCarnet] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect( () => {
    setShowModal(show);
    if (show === true) {
      getDataCarnet(
        schoolyearId, 
        id, 
        show);
      }
      else {setDataCarnet({})}
  },[schoolyearId, id, show]);

  const getDataCarnet = async (_schoolyearId, _id)=>{
    console.log(`GETDATACARNET ID: ${_id} / schoolyearId: ${_schoolyearId}`)
    if (_id !== '' && _id !== null){

      //http://localhost:5000/api/students/4-0286-0641/25/idcard
      await axios.get(APIServerURL + `api/students/${_id}/${_schoolyearId}/idcard`)
      .then(function (res) {
        console.log('axios result: ' + JSON.stringify(res.data))
          setDataCarnet(res.data.data);  
      })
      .catch(function (error) {
          setDataCarnet({});
          console.log(error);
      });
    }
  };

  const onImprimirClick =() =>{
    PHE.printElement( document.getElementById('carnet-container') );
    handleClose();
  }

  const handleClose = () => {setShowModal(false); onChange(false);};

  return (
    <Modal 
      show={showModal}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Imprimir Carnet Estudiante</Modal.Title>
       
      </Modal.Header>
      <Modal.Body >
        <CarnetSVG data={dataCarnet} alt="..." />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onImprimirClick}>Imprimir</Button>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
    );
  }
  
  export default CarnetModal;