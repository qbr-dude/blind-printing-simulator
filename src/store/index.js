import { configureStore } from '@reduxjs/toolkit';
import { InfoReducer } from './infoReducer';

export const store = configureStore({ reducer: InfoReducer });