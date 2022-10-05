import React, { memo, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const InfoField = memo(() => {
    const errors = useSelector(state => state.info.errors) || 0;
    const generalCount = useSelector(state => state.info.generalCount) || 0;
    const printSpeed = useSelector(state => state.info.printSpeed);

    // Optional values
    const [generalTime, setGeneralTime] = useState(0);
    const [generalPrintSpeed, setGeneralPrintSpeed] = useState(0);

    /* Calculate general time of testing*/
    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            setGeneralTime(Math.round((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    /** Calculate general print speed (depends on general time) */
    useEffect(() => {
        setGeneralPrintSpeed(Math.floor(generalCount / generalTime));
    }, [generalCount, generalTime]);

    /** Calculate accuracy */
    const accuracy = useMemo(() => Math.round((1 - errors / generalCount) * 100), [errors, generalCount]);

    return (
        <Container className='info-field py-3' fluid>
            <Row className='flex-column'>
                <Col>
                    <h1>Info about Testing</h1>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>General time: <span style={{ color: '#EDF5E1' }}>{generalTime}</span> sec</span>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>Wrong letters: <span style={{ color: '#EDF5E1' }}>{errors}</span> ltrs</span>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>Print speed: <span style={{ color: '#EDF5E1' }}>{printSpeed}</span> ltrs/sec</span>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>Print speed (avg): <span style={{ color: '#EDF5E1' }}>{generalPrintSpeed}</span> ltrs/gen-time</span>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>Accuracy: <span style={{ color: '#EDF5E1' }}>{accuracy}</span>%</span>
                </Col>
            </Row>
        </Container>
    );
})

export default InfoField;
