import React, { useState } from 'react';
import { Modal, Button, Accordion, Card } from 'react-bootstrap';


const labData = {
  S1: {
    'Python Lab': [
      { name: 'Area and Perimeter of a Circle', link: 'https://github.com/CET-MCA-26/MCA-Laboratory/edit/main/S1/PYTHON/01_area_perimeter_circle.py' },
      { name: 'Swap 2 Numbers', link: 'https://github.com/CET-MCA-26/MCA-Laboratory/edit/main/S1/PYTHON/02_swap2num.py' },
      { name: 'Largest of 3 numbers', link: 'https://github.com/CET-MCA-26/MCA-Laboratory/edit/main/S1/PYTHON/03_Lof3.py' },
    ],
    'DS Lab': [
      { name: 'Array', link: 'https://github.com/cetmca26/MCA-Laboratory/blob/main/S1/DS/array.c' },
      { name: 'Stack', link: 'https://github.com/cetmca26/MCA-Laboratory/blob/main/S1/DS/stack.c' },
      { name: 'Queue', link: 'https://github.com/cetmca26/MCA-Laboratory/blob/main/S1/DS/queue.c' },
    ]
  }
};

const LabPrograms = () => {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const openModal = (link) => {
    setModalContent(link);
    setShowModal(true);
  };

  return (
    <div className="container" style={{marginTop:'80px'}} >
      <h2 className="text-center">Lab Programs</h2>
      <Accordion defaultActiveKey="0">
        {Object.keys(labData).map((semester, index) => (
          <Card key={index}>
            <Accordion.Toggle as={Card.Header} eventKey={index.toString()} onClick={() => setSelectedSemester(semester)}>
              {semester}
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                {Object.keys(labData[semester]).map((subject, subIndex) => (
                  <Button key={subIndex} variant="info" className="m-2" onClick={() => setSelectedSubject(subject)}>
                    {subject}
                  </Button>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      {selectedSemester && selectedSubject && (
        <div className="mt-3">
          <h4>{selectedSubject}</h4>
          <ul className="list-group">
            {labData[selectedSemester][selectedSubject].map((program, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                {program.name}
                <Button variant="primary" onClick={() => openModal(program.link)}>View Program</Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Program Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Exit</Button>
          <Button variant="primary" onClick={() => handleCopy(modalContent)}>Copy Link</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LabPrograms
