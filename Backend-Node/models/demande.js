const db = require('../util/database');

module.exports = class Demande {
  constructor(sujet, date, user) {
    this.sujet = sujet;
    this.date = date;
    this.user = user;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM demandes');
  }

  static save(demande) {
    return db.execute(
      'INSERT INTO demandes (sujet, date, user) VALUES (?, ?, ?)',
      [demande.sujet, demande.date, demande.user]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM demandes WHERE id = ?', [id]);
  }
};
