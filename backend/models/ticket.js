const db = require("../util/database");

module.exports = class Ticket {
  constructor(status, placeFrom, placeTo, date, numberOfSeats) {
    this.status = status;
    this.placeFrom = placeFrom;
    this.placeTo = placeTo;
    this.date = date;
    this.numberOfSeats = numberOfSeats;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM tickets");
  }

  static save(ticket) {
    return db.execute(
      "INSERT INTO tickets (status, placeFrom, placeTo, date, numberOfSeats) VALUES (?, ?, ?, ?, ?)",
      [
        ticket.status,
        ticket.placeFrom,
        ticket.placeTo,
        ticket.date,
        ticket.numberOfSeats,
      ]
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM tickets WHERE id = ?", [id]);
  }

  static update(ticket, id) {
    return db.execute(
      "UPDATE tickets SET status = ?, placeFrom = ?, placeTo = ?, date = ?, numberOfSeats = ? WHERE id = ?",
      [
        ticket.status,
        ticket.placeFrom,
        ticket.placeTo,
        ticket.date,
        ticket.numberOfSeats,
        id,
      ]
    );
  }

  static fetchMyTickets(placeFrom, placeTo) {
    return db.execute(
      "SELECT * FROM tickets WHERE placeFrom = ? AND placeTo = ?",
      [placeFrom, placeTo]
    );
  }
};
