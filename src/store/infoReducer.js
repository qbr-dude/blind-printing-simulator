const defaultState = {
    generalCount: 0,
    errors: 0,
    printSpeed: 0,
}

export const InfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'WRONG_PRINT':
            return { ...state, errors: action.payload };
        case 'GENERAL_PRINT':
            return { ...state, generalCount: action.payload };
        case 'UPDATE_PRINTSPEED':
            return { ...state, printSpeed: action.payload };

        default:
            return state;
    }
}