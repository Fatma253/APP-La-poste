const db = require('../util/database');

module.exports = class Offre {
  constructor(titre, description, user) {
    this.titre = titre;
    this.description = description;
    this.user = user;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM offres');
  }

  static save(offre) {
    return db.execute(
      'INSERT INTO offres (titre, description, user) VALUES (?, ?, ?)',
      [offre.titre, offre.description, offre.user]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM offres WHERE id = ?', [id]);
  }
};
