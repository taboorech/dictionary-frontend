import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/auth';
import dictionaryReducer from '../dictionary/dictionary';

export default configureStore({
  reducer: {
    auth: authReducer,
    dictionary: dictionaryReducer
  },
})