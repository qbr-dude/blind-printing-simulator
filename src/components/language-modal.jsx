import React from 'react';
import { Button, Col, Modal, ModalFooter, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const LanguageModal = () => {
    const show = useSelector(state => state.language.isCyrillic);

    const dispatch = useDispatch();

    const handleClose = () => dispatch({ type: 'CYRILLIC_DETECTED', payload: false });

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header>
                <Modal.Title h2>You have selected RU(cyrillic) keyboard layout</Modal.Title>
            </Modal.Header>
            <Modal.Body className='py-3'>
                <span style={{ fontSize: '20px' }}>To continue, switch keyboard layout to EN. </span>
                <span style={{ fontSize: '20px' }}>Because the text is in Latin!</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ok, i got it
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LanguageModal;
