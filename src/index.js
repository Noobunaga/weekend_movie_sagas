import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';



// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_GENRES', getGenre);
    yield takeEvery('GET_ALL_GENRES', allGenres);
    yield takeEvery('POST_MOVIE', postNewMovie)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    };
};

function* getGenre(action) {
    try{
        const genres = yield axios.get(`/api/genre/${action.payload}`);
        console.log('What genre is this', genres.data);
        yield put({type: 'SET_GENRES', payload: genres.data})
    }
    catch(error) {
        console.log('Error getting genres', error);
    }
}

function* allGenres() {
    try{
        const genres = yield axios.get('/api/genre/all');
        console.log('Is this all genres?', genres.data);
        yield put({type: 'SET_GENRES', payload: genres.data})
    }
    catch(error) {
        console.log('Error with all Genres', error);
    }
}

function* postNewMovie(action) {
    try{
        yield call(axios.post, '/api/movie', action.payload);
    }
    catch(error) {
        console.log('Error posting', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const detailsReducer = (state = 0, action) => {
        if(action.type === 'MOVIE_DETAILS'){
            return state = action.payload;
        }
        return state;
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        detailsReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
