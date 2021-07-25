import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import { useHistory } from 'react-router';
import MovieList from '../MovieList/MovieList';