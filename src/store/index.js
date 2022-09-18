import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { InfoReducer } from './infoReducer';
import { LanguageReducer } from './languageReducer';

const reducers = combineReducers({ info: InfoReducer, language: LanguageReducer })
export const store = configureStore({ reducer: reducers });