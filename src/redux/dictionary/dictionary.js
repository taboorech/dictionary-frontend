import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import mainInstance from '../../api/mainInstance'

export const createWord = createAsyncThunk(
  'dictionary/create',
  async (data, { rejectWithValue }) => {
    return await mainInstance.put('/dictionary/create', {
      word: data.word,
      language: data.language,
      translate: data.translate
    })
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data.message));
  }
)

export const getWords = createAsyncThunk(
  'dictionary/getRecords',
  async (data, { rejectWithValue }) => {
    return await mainInstance.get('/dictionary')
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data.message));
  }
)

export const getWordsByDate = createAsyncThunk(
  'dictionary/getRecordsByDate',
  async ({ date }, { rejectWithValue }) => {
    return await mainInstance.get(`/dictionary/date/${date.toLocaleDateString('en-CA')}`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data.message));
  }
)

export const updateWord = createAsyncThunk(
  'dictionary/updateWord',
  async (data, { rejectWithValue }) => {
    return await mainInstance.patch(`/dictionary/${data._id}/edit`, {...data})
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data.message));
  }
)

export const deleteWord = createAsyncThunk(
  'dictionary/deleteWord',
  async (data, { rejectWithValue }) => {
    return await mainInstance.delete(`/dictionary/${data._id}/delete`)
    .then((response) => response.data)
    .catch((error) => rejectWithValue(error.response.data.message));
  }
)

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    word: '',
    language: null,
    translateWord: '',
    translateLanguage: '',
    translateSecondWord: '',
    translateSecondLanguage: '',
    savedWords: [],
    error: []
  },
  reducers: {
    changeWord: (state, action) => {
      state.word = action.payload;
    },
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    changeTranslateWord: (state, action) => {
      state.translateWord = action.payload;
    },
    changeTranslateLanguage: (state, action) => {
      state.translateLanguage = action.payload;
    },
    changeTranslateSecondWord: (state, action) => {
      state.translateSecondWord = action.payload;
    },
    changeTranslateSecondLanguage: (state, action) => {
      state.translateSecondLanguage = action.payload;
    },
    changeSavedWords: (state, action) => {
      state[action.payload.id] = action.payload.value;
    },
    deleteSavedWord: (state, action) => {
      let data = state.savedWords;
      data = data.filter(({_id}) => _id !== action.payload);
      state.savedWords = data;
    },
    changeFunction: (state, action) => {
      state[action.payload.key] = action.payload.value;
    }
  },
  extraReducers: builder => {
    builder
    .addCase(getWords.fulfilled, (state, action) => {
      state.savedWords = action.payload;
      action.payload.map((wordDetails) => (
        state[wordDetails._id] = wordDetails.word
      ))
      state.error = [];
    })
    .addCase(getWords.rejected, (state, action) => {
      if(Array.isArray(action.payload) && action.payload.length > 1) {
        state.error = [...action.payload];
      } else {
        state.error.push(action.payload);
      }
    })
    .addCase(getWordsByDate.fulfilled, (state, action) => {
      state.savedWords = action.payload;
      action.payload.map((wordDetails) => (
        state[wordDetails._id] = wordDetails.word
      ))
      state.error = [];
    })
    .addCase(getWordsByDate.rejected, (state, action) => {
      if(Array.isArray(action.payload) && action.payload.length > 1) {
        state.error = [...action.payload];
      } else {
        state.error.push(action.payload);
      }
    })
    .addCase(createWord.fulfilled, (state, action) => {
      state.word = '';
      state.language = '';
      state.translateWord = '';
      state.translateLanguage = '';
      const data = state.savedWords;
      data.push(action.payload);
      state.savedWords = data;
      state[action.payload._id] = action.payload.word;
      state.error = [];
    })
    .addCase(createWord.rejected, (state, action) => {
      if(Array.isArray(action.payload) && action.payload.length > 1) {
        state.error = [...action.payload];
      } else {
        state.error.push(action.payload);
      }
    })
    .addCase(updateWord.fulfilled, (state, action) => {
      state.error = [];
    })
    .addCase(updateWord.rejected, (state, action) => {
      if(Array.isArray(action.payload) && action.payload.length > 1) {
        state.error = [...action.payload];
      } else {
        state.error.push(action.payload);
      }
    })
    .addCase(deleteWord.fulfilled, (state, action) => {
      state.error = [];
    })
    .addCase(deleteWord.rejected, (state, action) => {
      if(Array.isArray(action.payload) && action.payload.length > 1) {
        state.error = [...action.payload];
      } else {
        state.error.push(action.payload);
      }
    })
  }
})

export const { 
  changeWord, 
  changeLanguage, 
  changeTranslateWord, 
  changeTranslateLanguage,
  changeTranslateSecondWord,
  changeTranslateSecondLanguage,
  addSavedWords,
  changeSavedWords,
  changeActiveEdit,
  deleteSavedWord,
  changeFunction
} = dictionarySlice.actions;

export default dictionarySlice.reducer;