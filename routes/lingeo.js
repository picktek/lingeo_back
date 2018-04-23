const _            = require('lodash');
const sqlite3      = require('sqlite3');
const express      = require('express');
const path         = require('path');
const uuidv4       = require('uuid/v4');
const sqliteParser = require('sqlite-parser');

const router        = express.Router();
const db            = new sqlite3.Database(path.resolve('./databases/lingeo.sqlite'));
const db_migrations = new sqlite3.Database(path.resolve('./databases/lingeo_migrations.sqlite'));

const logMigration = (sql) => {
  db_migrations.run('INSERT INTO migrations(`query`, `timestamp`, `uuid`) VALUES(?, ?, ?)', [sql, new Date().getTime(), uuidv4()], function (err, result) {
    console.log(err, result);
  });
};

db.on('trace', sql => {
  const query = sqliteParser(sql);
  console.log(sql);
  if (query.statement[0].variant !== 'select') {
    logMigration(sql);
  }
});

const aris = (chcode, mas) => {
  for (let j = 0; j < mas.length; j++) {if (mas[j] === chcode) {return (j);}}
  return (-1);
};

const gadaikvane = (objsaidan) => {
  const _eng_  = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 92, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 124, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34, 90, 88, 67, 86, 66, 78, 77, 60, 62, 63, ''];
  const _utf8_ = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 92, 4325, 4332, 4308, 4320, 4322, 4327, 4323, 4312, 4317, 4318, 91, 93, 4304, 4321, 4307, 4324, 4306, 4336, 4335, 4313, 4314, 59, 39, 4310, 4334, 4330, 4309, 4305, 4316, 4315, 44, 46, 47, 126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 124, 81, 4333, 69, 4326, 4311, 89, 85, 73, 79, 80, 123, 125, 65, 4328, 68, 70, 71, 72, 4319, 75, 76, 58, 34, 4331, 88, 4329, 86, 66, 78, 77, 60, 62, 63, ''];
  let st       = objsaidan;
  let st1      = '';
  let saidan   = _eng_;
  let sad      = _utf8_;
  let extramas = [];
  let ch;
  let chc;
  let chi;
  let newchar;
  for (let i = 0; i < st.length; i++) {
    ch = st.charAt(i);
    if (extramas[ch]) {st1 += extramas[ch];} else {
      chc = ch.charCodeAt(0);
      chi = aris(chc, saidan);
      if (chi !== -1) {
        newchar      = String.fromCharCode(sad[chi]);
        st1 += newchar;
        extramas[ch] = newchar;
      } else {
        st1 += ch;
        extramas[ch] = ch;
      }
    }
  }
  return st1;
};

const gadaikvaneUkan = (objsaidan) => {
  const _eng_  = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 92, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 124, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34, 90, 88, 67, 86, 66, 78, 77, 60, 62, 63, ''];
  const _utf8_ = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 92, 4325, 4332, 4308, 4320, 4322, 4327, 4323, 4312, 4317, 4318, 91, 93, 4304, 4321, 4307, 4324, 4306, 4336, 4335, 4313, 4314, 59, 39, 4310, 4334, 4330, 4309, 4305, 4316, 4315, 44, 46, 47, 126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43, 124, 81, 4333, 69, 4326, 4311, 89, 85, 73, 79, 80, 123, 125, 65, 4328, 68, 70, 71, 72, 4319, 75, 76, 58, 34, 4331, 88, 4329, 86, 66, 78, 77, 60, 62, 63, ''];
  let st       = objsaidan;
  let st1      = '';
  let saidan   = _utf8_;
  let sad      = _eng_;
  let extramas = [];
  let ch;
  let chc;
  let chi;
  let newchar;
  for (let i = 0; i < st.length; i++) {
    ch = st.charAt(i);
    if (extramas[ch]) {st1 += extramas[ch];} else {
      chc = ch.charCodeAt(0);
      chi = aris(chc, saidan);
      if (chi !== -1) {
        newchar      = String.fromCharCode(sad[chi]);
        st1 += newchar;
        extramas[ch] = newchar;
      } else {
        st1 += ch;
        extramas[ch] = ch;
      }
    }
  }
  return st1;
};

const wordINFO = (eng_id, cb) => {
  const query = 'SELECT t1.id, t1.eng, t1.transcription, t1.type as eng_type, t2.geo, t2.id as geo_id, t4.id as type_id, t4.name, t4.abbr FROM eng t1, geo t2, geo_eng t3, types t4 ' +
                'WHERE t1.id = ? AND t3.eng_id=t1.id AND t2.id=t3.geo_id AND t4.id=t2.type ' +
                'GROUP BY t2.id';

  const word = { geos: [] };

  db.all(query, [eng_id], function (err, rows) {
    if (err) {
      console.log(err);
      return;
    }
    _.forEach(rows, row => {
      word.id            = row.id;
      word.eng           = row.eng;
      word.eng_type      = row.eng_type;
      word.transcription = row.transcription;
      word.geos.push({
        id:      row.geo_id,
        geo:     gadaikvane(row.geo),
        type_id: row.type_id,
        type:    row.name,
        abbr:    row.abbr
      });
    });

    if (_.isFunction(cb)) {
      cb(word);
    }
  });
};

router.get('/', (req, res) => {
  const offset = _.defaultTo(req.query.offset, 0);
  const limit  = _.defaultTo(req.query.limit, 100);
  const search = _.defaultTo(req.query.search, '');
  console.log(req.query);

  db.all('SELECT * FROM eng WHERE eng LIKE ? || "%" limit ?,?', [search, offset, limit], function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });

});

router.get('/word_types', (req, res) => {
  db.all('SELECT * FROM types', function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  wordINFO(req.params.id, word => res.json(word));
});

router.post('/:id', (req, res) => {
  const insertGeo = (eng_id, geo, cb) => {
    /** usage of function callback is critical here to obtain this.lastID **/
    db.run('INSERT INTO `geo`(`geo`, `type`) VALUES(?, ?)', [gadaikvaneUkan(geo.geo), geo.type_id], function (err) {
      if (err) {
        console.log('insertGeo', err);
        return;
      }

      db.run('INSERT INTO `geo_eng`(`eng_id`, `geo_id`, `type`) VALUES(?, ?, ?)', [eng_id, this.lastID, geo.type_id], cb);
    });
  };

  const eng_id = _.toFinite(req.body.id);
  if (eng_id > 0) {
    wordINFO(eng_id, dbData => {
      if (req.body.eng !== dbData.eng || req.body.transcription !== dbData.transcription || req.body.eng_type !== dbData.eng_type) {
        db.run('UPDATE `eng` SET `eng` = ?, `transcription` = ?, `type` = ? WHERE `id` = ?', [req.body.eng, req.body.transcription, req.body.eng_type, eng_id]);
        res.sendStatus(202);
      } else {
        _.forEach(req.body.geos, geo => {
          _.forEach(dbData.geos, dbGeo => {
            if (geo.id === dbGeo.id && (geo.geo !== dbGeo.geo || geo.type_id !== dbGeo.type_id)) {
              db.run('UPDATE `geo` SET `geo` = ?, `type` = ? WHERE `id` = ?', [gadaikvaneUkan(geo.geo), geo.type_id, geo.id]);
            } else if (geo.id < 0) {
              insertGeo(eng_id, geo);
            }
          });
        });

        const remainingGeos = _.map(req.body.geos, geo => _.toFinite(geo.id));
        const currentGeos   = _.map(dbData.geos, geo => _.toFinite(geo.id));
        const geosDiff      = _.difference(currentGeos, remainingGeos);
        if (_.isEmpty(geosDiff) === false) {
          const geosBind = `(${_.join(geosDiff, ',')})`; // shame on node-sqlite
          db.run('DELETE FROM `geo_eng` WHERE `geo_id` in ' + [geosBind], (err) => {
            if (err) {
              console.log(err);
              return;
            }
            db.run('DELETE FROM `geo` WHERE `id` in ' + [geosBind], function (err) {
              if (err) {
                console.log(err);
                res.sendStatus(404);
              } else {
                res.sendStatus(202);
              }
            });
          });
        } else {
          res.sendStatus(202);
        }
      }
    });
  } else if (eng_id === -1 && _.isEmpty(req.body.geos) === false) {
    /** usage of function callback is critical here to obtain this.lastID **/
    db.run('INSERT INTO `eng`(`eng`, `type`, `transcription`) VALUES(?, ?, ?)', [req.body.eng, _.defaultTo(req.body.eng_type, 1), _.defaultTo(req.body.transcription, '')], function (err) {
      if (err) {
        console.log('eng_insert_error', err);
        res.sendStatus(404);
        return;
      }
      const eng_id = this.lastID;
      _.forEach(req.body.geos, geo => {
        insertGeo(eng_id, geo);
      });
      
      res.json({ new_eng_id: eng_id });
    });
  } else {
    console.log('not implemented', req.body);
    res.sendStatus(400);
  }
});

/** was using delete but it wasn't getting called so went with post **/
router.post('/delete/:id', (req, res) => {
  console.log(req.params.id);
  wordINFO(req.params.id, dbData => {
    const currentGeos = _.map(dbData.geos, geo => _.toFinite(geo.id));
    const geosBind    = `(${_.join(currentGeos, ',')})`; // shame on node-sqlite
    const handleError = error => {
      console.log(error);
      res.sendStatus(404);
    };
    db.run('DELETE FROM `geo_eng` WHERE `geo_id` in ' + [geosBind], function (err1) {
      if (err1) {
        handleError(err1);
        return;
      }
      db.run('DELETE FROM `geo` WHERE `id` in ' + [geosBind], function (err2) {
        if (err2) {
          handleError(err2);
          return;
        }
        db.run('DELETE FROM `geo_eng` WHERE `eng_id` = ? ', dbData.id, function (err3) {
          if (err3) {
            handleError(err3);
            return;
          }
          db.run('DELETE FROM `eng` WHERE `id` = ? ', dbData.id, function (err4) {
            if (err4) {
              handleError(err4);
              return;
            }
            res.sendStatus(202);
          });
        });
      });

    });
  });
});

module.exports = router;
