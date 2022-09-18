import React, { memo, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTime } from '../../utils/time';

const InfoField = memo(() => {
    const errors = useSelector(state => state.errors);
    const generalCount = useSelector(state => state.generalCount);

    const [generalTime, setGeneralTime] = useState(0);
    const [printSpeed, setPrintSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    /* Calculate general time of testing*/
    useEffect(() => {
        const startTime = Date.now();

        const interval = setInterval(() => {
            setGeneralTime(Math.round((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    /** Calculate print speed */
    useEffect(() => {
        setPrintSpeed(Math.floor(generalCount / generalTime));
    }, [generalCount, generalTime]);

    useEffect(() => {
        setAccuracy(Math.round((1 - errors / generalCount) * 100));
    }, [generalCount]);

    return (
        <Container className='info-field py-3' fluid>
            <Row className='flex-column'>
                <Col>
                    <h1>Info about Testing</h1>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>General time: {generalTime} sec</span>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>Wrong letters: {errors} ltrs</span>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>Print speed (avg): {printSpeed} ltrs/sec</span>
                </Col>
                <Col className='py-2'>
                    <span style={{ fontSize: '24px' }}>Accuracy: {accuracy}%</span>
                </Col>
            </Row>
        </Container>
    );
})

export default InfoField;
