const express       = require('express');
const router        = express.Router();
const path          = require('path');
const sqlite3       = require('sqlite3');
const db_migrations = new sqlite3.Database(path.resolve('./databases/lingeo_migrations.sqlite'), sqlite3.OPEN_READWRITE);

router.get('/', function (req, res) {
  db_migrations.all('SELECT * FROM migrations LIMIT 500', function (err, result) {
    if (err) {
      console.log(err);
      return;
    }

    db_migrations.get('SELECT count(*) as total_count FROM migrations', function (err, row) {
      if (err) {
        console.log(err);
        return;
      }

      res.json({
        data:        result,
        total:       row.total_count,
        fixed_limit: 500
      });
    });
  });
});

router.get('/:uuid', function (req, res) {
  db_migrations.all('SELECT * FROM migrations WHERE id > (SELECT id FROM migrations WHERE uuid = ?) LIMIT 500', req.params.uuid, function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    
    db_migrations.get('SELECT count(*) as total_count FROM migrations', function (err, row) {
      if (err) {
        console.log(err);
        return;
      }

      res.json({
        data:        result,
        total:       row.total_count,
        fixed_limit: 500
      });
    });
  });
});

module.exports = router;
