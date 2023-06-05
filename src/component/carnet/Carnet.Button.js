import React, { useState } from 'react';
import {Button} from 'react-bootstrap';

import CarnetModal from './Carnet.Modal';
import { FaIdCard } from 'react-icons/fa';


function CarnetButton({studentId,schoolyearId}) {
  const [showModal, setShowModal] = useState(false);

  const onChangeModalCarnet = (e) => {
      setShowModal(e);
  }

  const  onClick = () => {
    setShowModal(true);
  }

    return (
      <div>
        <Button onClick={onClick}> 
      <FaIdCard size={24} />
        </Button>
        <CarnetModal id={studentId}  schoolyearId={schoolyearId} show={showModal} onChange={onChangeModalCarnet}/>
      </div>
    );
  }
  
  export default CarnetButton;