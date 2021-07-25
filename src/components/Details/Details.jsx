import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import { useHistory } from 'react-router';
import MovieList from '../MovieList/MovieList';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { CardMedia } from '@material-ui/core';

function Details() {
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector(store => store.detailsReducer);

    const goToList = () => {
        history.push('/')
    };

    useEffect(() => {
        getDetails() },
        []);

        const getDetails = () => {
            dispatch({type: 'GET_DETAILS'});
        }
        console.log('before return', details);
        return(
            <Button variant= "contained" color="primary" onClick={goToList}>Back to List</Button>
            // <Grid item style={{height: "550px" }} id={movieItem.id}> 
            // <Paper className={classes.paper}>
            // <CardMedia
            // style={{height: "550px" }}
            // className={movieItem.title}
            // component="img"
            // alt={movieItem.title}
            // src={movieItem.details}
            // title={movieItem.title}
            // />
            // </Paper>
            // </Grid> 

        );
};

export default Details;