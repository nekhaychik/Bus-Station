import { Component, OnInit } from '@angular/core';
import { Collections } from 'src/app/enum';
import { CrudService } from 'src/app/services/crud.service';
import { BookingStore, TicketStore } from 'src/app/services/types';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  booking: BookingStore[] = [];

  myBooking: BookingStore | null = null;
  tickets: TicketStore[] = [];

  constructor(private crudService: CrudService) {
    this.crudService
      .handleData<BookingStore>(Collections.BOOKING)
      .subscribe((booking) => {
        this.tickets = [];
        this.booking = booking as BookingStore[];
        this.booking = this.booking.filter(
          (booking) =>
            booking.userId.toString() == localStorage.getItem('userID')
        );
        this.myBooking = this.booking[0];
        this.myBooking.ticketId.forEach((ticketID) => {
          this.crudService
            .getDataDoc<TicketStore>(Collections.TICKETS, ticketID)
            .subscribe((ticket) => {
              if (ticket)  {
                ticket.id = ticketID;
                this.tickets.push(ticket);
              }
            });
        });
      });
  }

  ngOnInit(): void {}

  cancel(ticket: TicketStore, index: number) {
    this.crudService.updateObject(Collections.TICKETS, ticket.id, {
      numberOfSeats: ticket.numberOfSeats + 1,
    });
    if (this.myBooking) {
      let ticketArray = [...this.myBooking.ticketId.slice(0, index), ...this.myBooking.ticketId.slice(index + 1, )];
      this.crudService.updateObject(Collections.BOOKING, this.myBooking.id, {
        ticketId: ticketArray,
      });
    }

  }

  getStringDate(seconds: number) {
    return new Date(seconds * 1000).toLocaleDateString();
  }

  getStringTime(seconds: number) {
    return new Date(seconds * 1000).toLocaleTimeString();
  }
}
