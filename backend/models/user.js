const db = require("../util/database");

module.exports = class User {
  constructor(name, phone, hash, role) {
    this.name = name;
    this.phone = phone;
    this.hash = hash;
    this.role = role;
  }

  static find(phone) {
    return db.execute("SELECT * FROM users WHERE phone = ?", [phone]);
  }

  static save(user) {
    return db.execute(
      "INSERT INTO users (name, phone, hash, role) VALUES (?, ?, ?, ?)",
      [user.name, user.phone, user.hash, user.role]
    );
  }
};
