import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        console.log('where is this happening', history.location.pathname);
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const movieDetails = (movie) => {
        console.log('movie details', movie);
        dispatch({type: 'MOVIE_DETAILS', payload: movie})
        dispatch({type: 'GET_GENRES', payload: movie})
        history.push('/details')
    }

    const goToAddMovie = () => {
        history.push('/addmovie')
    };

    return (
        <main>
            <h1>MovieList</h1>
            <Button style={{width: "150px", height: "55px"}} variant="contained" color="primary" onClick={goToAddMovie}>Add New Movie</Button>
            <section className="movies">
                {movies.map((movie, index) => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => movieDetails(movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;