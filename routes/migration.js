const express       = require('express');
const router        = express.Router();
const path          = require('path');
const sqlite3       = require('sqlite3');
const db_migrations = new sqlite3.Database(path.resolve('./databases/lingeo_migrations.sqlite'), sqlite3.OPEN_READWRITE);

router.get('/', function (req, res) {
  db_migrations.all('SELECT * FROM migrations', function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });
});

router.get('/:uuid', function (req, res) {
  db_migrations.all('SELECT * FROM migrations WHERE id > (SELECT id FROM migrations WHERE uuid = ?)', req.params.uuid, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
