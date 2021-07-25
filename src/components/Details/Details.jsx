import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import { useHistory } from 'react-router';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";



function Details() {
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector(store => store.detailsReducer);
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);

    const goToList = () => {
        history.push('/')
    };

    useEffect(() => {
        dispatch({type: 'FETCH_MOVIES'})
    },[]);


        return(
            <>
            <Button style={{width: "150px", height: "55px"}} variant="contained" color="primary" onClick={goToList}>Back to List</Button>
            <div>
                <h1>{movies[details-1].title}</h1>
                <img src={movies[details-1].poster} />
                <p>{movies[details-1].description}</p>
            </div>
            <table>
                <tbody>
                    <tr>
                        <tr>Genre:</tr>
                        {genres.map((genre, index) => {
                            return <li key={index}>{genre.name}</li>
                        })}
                    </tr>
                </tbody>
            </table>
            </>
        );
};

export default Details;