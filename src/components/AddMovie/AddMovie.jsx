import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import './AddMovie.css'

function AddMovie() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');

    const movie = [];

    const genreHandler = [{value: 0, label: "Select An Option"}, {value: 1, label: "Adventure"}, {value: 2, label: "Animated"}, {value: 3, label: "Biographical"}, {value: 4, label: "Comedy"}, {value: 5, label: "Disaster"}, {value: 6, label: "Drama"}, {value: 7, label: "Epic"}, {value: 8, label: "Fantasy"}, {value: 9, label: "Musical"}, {value: 10, label: "Romantic"}, {value: 11, label: "Science Fiction"}, {value: 12, label: "Space-Opera"}, {value: 13, label: "Superhero"}];
    const handleClose = () => { setTitle(''); setGenre(0); setDescription(''); setUrl('') };

    const submit = () => { // submit onClick function
        if (title == "" || description == "" || url == "" || genre == 0) { // checks for any empty inputs and declines to post if there are any
            alert('Please fill in all inputs');
            return false;
        };
        movie.push({ title: title, description: description, poster: url, genre_id: genre }); // pushes movie data into movie array to send back to server
        // console.log(movieGenre); // test function
        dispatch({ // sends an ADD_MOVIE request on submit with the payload of movie array (all the data we collected in the form)
            type: "POST_MOVIE",
            payload: movie
        });
        handleClose(); // requests function to clears everything
    };

    // const newMovieData = () => {
    //     event.preventDefault();
    //     const newMovie = {title: title, poster: url, description: description, genre_id: genre}
    //     console.log('Getting info from database', newMovie);
    //     dispatch({type: 'POST_MOVIE', payload: newMovie})
    //     setDescription('')
    //     setTitle('')
    //     setUrl('')
    // }

    // const goToList = () => {
    //     history.push('/')
    // }

return(
    <section>
        <form action="submit">
            <h2>Add Movie</h2>
            <div className="addform" style={{width: '550px'}}>
                        <TextField id="Movie Title" label="Movie Title" variant="outlined" style={{width: "100%"}} value={title} onChange={(event) => setTitle(event.target.value)}/><br /><br />
                        <TextField id="Movie Description" label="Movie Description" style={{width: "100%"}} multiline maxRows={6} variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)}/><br /><br />
                        <TextField id="Movie Poster URL" label="Movie Poster URL" style={{width: "100%"}} variant="outlined" value={url} onChange={(event) => setUrl(event.target.value)}/><br /><br />
                        <TextField select id="Movie Genre Selector" label="Genre" style={{width: "100%"}} SelectProps={{native: true}} variant="outlined" onChange={(event) => setGenre(event.target.value)}>
                            {genreHandler.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField><br /><br />
                        <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                        &nbsp;
                        <Button variant="contained" color="primary" onClick={submit}>Submit</Button> 
                    </div>
        </form>
    </section>
)
}


export default AddMovie;

