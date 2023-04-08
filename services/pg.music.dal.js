const dal = require("./pdb");

var getMusicJson = function () {
  if (DEBUG) console.log("music.pg.dal.getMusicJson()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM music_collection   ORDER BY music_id ASC;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getMusic = function () {
  if (DEBUG) console.log("music.pg.dal.getMusic()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT * FROM music_collection \
    ORDER BY music_id ASC;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getMusicItemByMusicId = function (id) {
  if (DEBUG) console.log("music.pg.dal.getMusicItemByMusicId()");
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT music_id AS _id, album_name, artist_name, type, price FROM music_collection WHERE music_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var addMusicItem = function (music_id, album_name, artist_name, type, price) {
  if (DEBUG) console.log("music.pg.dal.addMusicItem()");
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO music_collection (music_id, album_name, artist_name, type, price) \
        VALUES ($1, $2, $3, $4, $5);";
    dal.query(
      sql,
      [music_id, album_name, artist_name, type, price],
      (err, result) => {
        if (err) {
          if (DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

var putMusicItem = function (music_id, album_name, artist_name, type, price) {
  if (DEBUG) console.log("music.pg.dal.putMusicItem()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE public.music_collection SET album_name=$2, artist_name=$3, type=$4, price=$5 WHERE music_id=$1;";
    dal.query(
      sql,
      [music_id, album_name, artist_name, type, price],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

var patchMusicItem = function (music_id, album_name, artist_name, type, price) {
  if (DEBUG) console.log("music.pg.dal.patchMusicItem()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE public.music_collection SET album_name=$2, artist_name=$3, type=$4, price=$5 WHERE music_id=$1;";
    dal.query(
      sql,
      [music_id, album_name, artist_name, type, price],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

var deleteMusicItem = function (id) {
  if (DEBUG) console.log("music.pg.dal.deleteMusicItem()");
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM music_collection WHERE music_id = $1;`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getMusic,
  getMusicItemByMusicId,
  addMusicItem,
  deleteMusicItem,
  patchMusicItem,
  putMusicItem,
  getMusicJson,
};
