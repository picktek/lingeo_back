const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      uri:    '/migration',
      method: 'GET'
    },
    {
      uri:    '/migration/:uuid',
      method: 'GET'
    },
    {
      uri:    '/lingeo',
      method: 'GET'
    },
    {
      uri:    '/lingeo/word_types',
      method: 'GET'
    },
    {
      uri:    '/lingeo/:id',
      method: 'GET'
    },
    {
      uri:    '/lingeo/:id',
      method: 'POST'
    },
    {
      uri:    '/lingeo/delete/:id',
      method: 'POST'
    }
  ]);
});

module.exports = router;
