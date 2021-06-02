const db = require('../util/database');

module.exports = class User {
  constructor(nom, email, password) {
    this.nom = nom;
    this.email = email;
    this.password = password;
    this.role= this.role;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (nom, email, password, role) VALUES (?, ?, ?, ?)',
      [user.nom, user.email, user.password, "user"]
    );
  }
};
