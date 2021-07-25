import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './AddMovie.css'

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    const newMovieData = () => {
        event.preventDefault();
        const newMovie = {title: title, poster: url, description: description, genre_id: genre}
        console.log('Getting info from database', newMovie);
        dispatch({type: 'POST_MOVIE', payload: newMovie})
        setDescription('')
        setTitle('')
        setUrl('')
    }

    const goToList = () => {
        history.push('/')
    }

return(

)
}


export default AddMovie;