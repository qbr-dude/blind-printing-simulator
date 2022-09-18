const defaultState = {
    isCiryllic: false,
}

export const LanguageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CYRILLIC_DETECTED':
            return { ...state, isCyrillic: action.payload };

        default:
            return state;
    }
}