import { type } from "os";

export type Ticket = {
  status: string;
  placeFrom: string;
  placeTo: string;
  date: {
    seconds: number;
  };
  numberOfSeats: number;
};

export type Booking = {
  userId: number;
  ticketId: string[];
}

export type ID = {
  id: string;
}

export type TicketStore = Ticket & ID;
export type BookingStore = Booking & ID;
