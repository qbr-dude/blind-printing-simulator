import React, { memo, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchText } from '../../API/text-fetch';
import { useKeyPressEvent } from '../../hooks/use-events';
import './text-area.css';

const TextArea = memo(() => {
    const [letterIndex, setLetterIndex] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    useKeyPressEvent({
        callback: (event) => {
            if (event.key === 'Shift' || event.key === 'Alt' || event.key === 'Ctrl')
                return;
            if (event.code === 'Space' && text[letterIndex].key !== ' ')
                return;
            const temp = text;
            if (event.key === text[letterIndex].key) {
                temp[letterIndex].status = 'passed';
            } else {
                temp[letterIndex].status = 'incorrect';
                dispatch({ type: 'WRONG_PRINT', payload: (incorrectCount + 1) });
                setIncorrectCount(incorrectCount + 1);
            }
            dispatch({ type: 'GENERAL_PRINT', payload: (letterIndex + 1) });
            setText(temp);
            setLetterIndex(letterIndex + 1);
        }
    });

    useEffect(() => {
        getTextFromAPI();
    }, []);

    const getTextFromAPI = async () => {
        const fetchingText = await fetchText();

        setText(fetchingText.map((letter) => {
            return { key: letter, status: 'inactive' };
        }));
    }

    const ColorizedLetter = ({ letter, index }) => {
        let styles = `${letter.status}-letter`;
        if (index === letterIndex && letter.key !== ' ')
            styles += ' current-letter';
        return (<span
            className={styles}
            key={index}>{letter.key}
        </span>);
    }

    if (text)
        return (
            <Container fluid>
                <Row className='text'>
                    <Col>
                        {text.map((letter, index) => ColorizedLetter({ letter, index }))}
                    </Col>
                </Row>
            </Container >
        );
    else
        return null;
});

export default TextArea;
