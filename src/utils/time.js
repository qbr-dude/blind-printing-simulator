export const getTime = () => {
    const startTime = Date.now();

    return () => (Date.now() - startTime);
}

export const calculatePrintSpeed = ({ value }) => {
    return Math.round(getTime() / value);
}