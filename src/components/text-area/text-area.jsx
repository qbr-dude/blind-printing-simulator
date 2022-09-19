import React, { memo, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAPIText } from '../../API/text-fetch';
import { useKeyPressEvent } from '../../hooks/use-events';
import { useFetching } from '../../hooks/use-fetching';
import { useInterval } from '../../hooks/use-interval';
import './text-area.css';

const cyrillicPattern = /^[\u0400-\u04FF]+$/;

const TextArea = memo(() => {
    const [text, setText] = useState('');
    const [lettersPerSec, setLettersPerSec] = useState(0);

    const letterIndex = useSelector(state => state.info.generalCount);
    const incorrectCount = useSelector(state => state.info.errors);

    const dispatch = useDispatch();

    const [fetchText, isLoading, error] = useFetching(async () => {
        //Проверка на конец текста, чтобы загрузить новый
        if (letterIndex !== 0 && letterIndex + 1 < text.length)
            return;

        // Сброс значений
        setText('');
        dispatch({ type: 'RESET_ALL' });
        const fetchingText = await fetchAPIText();

        //Добавление статуса для подсветки буковок
        setText(fetchingText.map((letter) => {
            return { key: letter, status: 'inactive' };
        }));
    });

    useEffect(() => {
        fetchText();
    }, [letterIndex]);

    /** Обработка нажатия, не обрабатываются SHIFT, ALT, CTRL и SPACE, если текущий символ не пробел
     *  Если верно нажат, то статус меняется на correct, иначе - incorrent
     *  Также подсчитываются все нажатия, и используется подсчет нажатий/сек (обнуляется в хуке ниже)
     */
    useKeyPressEvent({
        callback: (event) => {
            // Проверка на кириллицу
            if (cyrillicPattern.test(event.key)) {
                dispatch({ type: 'CYRILLIC_DETECTED', payload: true });
                return;
            }

            if (event.key === 'Shift' || event.key === 'Alt' || event.key === 'Ctrl')
                return;
            if (event.code === 'Space' && text[letterIndex].key !== ' ')
                return;

            const temp = text;
            if (event.key === text[letterIndex].key) {
                temp[letterIndex].status = 'correct';
            } else {
                temp[letterIndex].status = 'incorrect';
                dispatch({ type: 'WRONG_PRINT', payload: (incorrectCount + 1) });
            }

            dispatch({ type: 'GENERAL_PRINT', payload: (letterIndex + 1) });
            setLettersPerSec(lettersPerSec + 1);
            setText(temp);
        }
    });

    useInterval({
        callback: () => {
            dispatch({ type: 'UPDATE_PRINTSPEED', payload: lettersPerSec });
            setLettersPerSec(0);
        },
        delay: 1000,
    })

    /** Colorizing letter based on its status */
    const ColorizedLetter = ({ letter, index }) => {
        let styles = `letter ${letter.status}-letter`;
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
                {text.map((letter, index) => ColorizedLetter({ letter, index }))}
            </Container >
        );
    else
        return (
            <h1 style={{ color: '#1348db' }}>Text is loading...</h1>
        );
});

export default TextArea;
