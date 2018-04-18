const _        = require('lodash');
const Database = require('better-sqlite3');
const express  = require('express');
const path     = require('path');

const router        = express.Router();
const db            = new Database(path.resolve('./databases/lingeo.sqlite'), { fileMustExist: true });
const db_migrations = new Database(path.resolve('./databases/lingeo_migrations.sqlite'), { fileMustExist: true });

const aris = (chcode, mas) => {
  for (j = 0; j < mas.length; j++) {if (mas[j] === chcode) {return (j);}}
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

router.get('/', (req, res) => {
  const result = [];

  const offset = _.defaultTo(req.query.offset, 0);
  const limit  = _.defaultTo(req.query.limit, 100);
  const search = _.defaultTo(req.query.search, '');
  console.log(req.query);

  try {
    const stmt = db.prepare('SELECT * FROM eng WHERE eng LIKE ? || "%" limit ?,?');
    for (const row of stmt.iterate([search, offset, limit])) {
      result.push(row);
    }
  } catch (e) {
    console.log(e);
  }

  res.json(result);
});

router.get('/:id', (req, res) => {
  const rows = db.prepare('SELECT t1.id, t1.eng, t1.transcription, t2.geo, t2.id as geo_id, t4.id as type_id, t4.name, t4.abbr FROM eng t1, geo t2, geo_eng t3, types t4 ' +
                          'WHERE t1.id = ? AND t3.eng_id=t1.id AND t2.id=t3.geo_id AND t4.id=t2.type ' +
                          'GROUP BY t2.id').all([req.params.id]);

  const word = { geos: [] };

  _.forEach(rows, row => {
    word.id            = row.id;
    word.eng           = row.eng;
    word.transcription = row.transcription;
    word.geos.push({
      id:      row.geo_id,
      geo:     gadaikvane(row.geo),
      type_id: row.type_id,
      type:    row.name,
      abbr:    row.abbr
    });
  });
  res.json(word);
});

router.post('/:id', (req, res) => {
  console.log(req.body);

  res.json(req.body);
});

module.exports = router;
