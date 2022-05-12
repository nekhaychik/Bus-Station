const express = require("express");

const { body } = require("express-validator");

const ticketController = require("../controllers/tickets");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", ticketController.fetchAll);

router.get(
  "/search",
  [
    body("placeFrom").trim().not().isEmpty(),
    body("placeTo").trim().not().isEmpty(),
  ],
  ticketController.fetchMyTickets
);

router.post(
  "/",
  [
    body("status").trim().not().isEmpty(),
    body("placeFrom").trim().not().isEmpty(),
    body("placeTo").trim().not().isEmpty(),
    body("date").trim().not().isEmpty(),
    body("numberOfSeats").trim().not().isEmpty().isNumeric(),
  ],
  ticketController.postTicket
);

router.delete("/:id", ticketController.deleteTicket);

router.put(
  "/:id",
  [
    body("status").trim().not().isEmpty(),
    body("placeFrom").trim().not().isEmpty(),
    body("placeTo").trim().not().isEmpty(),
    body("date").trim().not().isEmpty(),
    body("numberOfSeats").trim().not().isEmpty().isNumeric(),
  ],
  ticketController.updateTicket
);

module.exports = router;
