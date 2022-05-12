const { validationResult } = require("express-validator");

const Ticket = require("../models/ticket");

exports.fetchAll = async (req, res, next) => {
  try {
    const [AllTickets] = await Ticket.fetchAll();
    res.status(200).json(AllTickets);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchMyTickets = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) return;

  const placeFrom = 'Minsk';
  const placeTo = 'Grodno';

  try {
    const [Tickets] = await Ticket.fetchMyTickets(placeFrom, placeTo);
    res.status(200).json(Tickets);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postTicket = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const status = req.body.status;
  const placeFrom = req.body.placeFrom;
  const placeTo = req.body.placeTo;
  const date = req.body.date;
  const numberOfSeats = req.body.numberOfSeats;

  try {
    const ticketDetails = {
      status: status,
      placeFrom: placeFrom,
      placeTo: placeTo,
      date: date,
      numberOfSeats: numberOfSeats,
    };

    const result = await Ticket.save(ticketDetails);

    res.status(201).json({ message: "Ticket has been added!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteTicket = async (req, res, next) => {
  try {
    const deleteResponse = await Ticket.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateTicket = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const status = req.body.status;
  const placeFrom = req.body.placeFrom;
  const placeTo = req.body.placeTo;
  const date = req.body.date;
  const numberOfSeats = req.body.numberOfSeats;

  try {
    const ticketDetails = {
      status: status,
      placeFrom: placeFrom,
      placeTo: placeTo,
      date: date,
      numberOfSeats: numberOfSeats,
    };

    const updateResponse = await Ticket.update(ticketDetails, req.params.id);
    res.status(200).json({ message: "Ticket has been updated!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
