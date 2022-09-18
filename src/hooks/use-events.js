import { useEffect, useRef } from "react"

export const useKeyPressEvent = ({ callback }, element = window) => {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = callback;
    }, [callback]);

    useEffect(() => {
        const eventListener = event => savedHandler.current(event);
        element.addEventListener('keyup', eventListener);

        return () => {
            element.removeEventListener('keyup', eventListener);
        };
    }, [element]);
}