const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  const qText = `SELECT "genres".name
  FROM "genres"
  JOIN "movies_genres" ON "genres".id = "movies_genres".genre_id
  JOIN "movies" ON "movies".id = "movies_genres".movie_id
  WHERE "movies".id = $1; 
  `;
  pool.query(qText, [req.params.id])
  .then(results => {
    res.send(results.rows);
  })
  .catch(err => {
  console.log('Error', err);
  res.sendStatus(500)
  })
});

module.exports = router;