import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Collections } from 'src/app/enum';
import { CrudService } from 'src/app/services/crud.service';
import { BookingStore, Ticket, TicketStore } from 'src/app/services/types';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  public tickets: TicketStore[] = [];
  public booking: BookingStore[] = [];
  currentBooking: BookingStore[] = [];
  isFiltered: boolean = false;
  searchForm: FormGroup = new FormGroup({});
  updateForm: FormGroup = new FormGroup({});
  createForm: FormGroup = new FormGroup({});
  userStatus: string | null = null;

  constructor(private crudService: CrudService) {
    this.crudService
      .handleData<TicketStore>(Collections.TICKETS)
      .subscribe((tickets) => {
        this.tickets = tickets as TicketStore[];
      });
    this.crudService
      .handleData<BookingStore>(Collections.BOOKING)
      .subscribe((booking) => {
        this.booking = booking as BookingStore[];
      });
  }

  getStringDate(seconds: number) {
    return new Date(seconds * 1000).toLocaleDateString();
  }

  getStringTime(seconds: number) {
    return new Date(seconds * 1000).toLocaleTimeString();
  }

  ngOnInit(): void {
    this.searchForm = this.createFormGroup();
    this.updateForm = this.createUpdatingFormGroup();
    this.createForm = this.createCreatingFormGroup();
    this.userStatus = localStorage.getItem('userID');
  }

  createUpdatingFormGroup(): FormGroup {
    return new FormGroup({
      statusUp: new FormControl(``, [
        Validators.required,
        Validators.minLength(2),
      ]),
      placeFromUp: new FormControl(``, [
        Validators.required,
        Validators.minLength(2),
      ]),
      placeToUp: new FormControl(``, [
        Validators.required,
        Validators.minLength(2),
      ]),
      dateUp: new FormControl(``, [Validators.required]),
      numberOfSeatsUp: new FormControl(``, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  createCreatingFormGroup(): FormGroup {
    return new FormGroup({
      statusCr: new FormControl(``, [
        Validators.required,
        Validators.minLength(2),
      ]),
      placeFromCr: new FormControl(``, [
        Validators.required,
        Validators.minLength(2),
      ]),
      placeToCr: new FormControl(``, [
        Validators.required,
        Validators.minLength(2),
      ]),
      dateCr: new FormControl(``, [Validators.required]),
      numberOfSeatsCr: new FormControl(``, [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      placeFrom: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      placeTo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      date: new FormControl('', [Validators.required]),
    });
  }

  public submitForm(): void {
    console.log(Date.parse(this.searchForm.controls['date'].value));
    if (this.searchForm.valid) {
      const data = {
        placeFrom: this.searchForm.controls['placeFrom'].value,
        placeTo: this.searchForm.controls['placeTo'].value,
        date: Date.parse(this.searchForm.controls['date'].value),
      };

      this.crudService
        .handleData<TicketStore>(Collections.TICKETS)
        .subscribe((tickets) => {
          this.tickets = tickets as TicketStore[];
          this.tickets = this.tickets.filter(
            (ticket) => ticket.placeFrom == data.placeFrom
          );
          this.tickets = this.tickets.filter(
            (ticket) => ticket.placeTo == data.placeTo
          );
          this.tickets = this.tickets.filter(
            (ticket) =>
              this.getStringDate(ticket.date.seconds) ==
              this.getStringDate(data.date / 1000)
          );
          this.isFiltered = true;
        });
    } else {
      alert('ERROR');
    }
  }

  submitUpdatingForm(ticket: TicketStore) {
    if (this.updateForm.valid) {
      const data = {
        status: this.updateForm.controls['statusUp'].value,
        placeFrom: this.updateForm.controls['placeFromUp'].value,
        placeTo: this.updateForm.controls['placeToUp'].value,
        date: this.updateForm.controls['dateUp'].value,
        numberOfSeats: this.updateForm.controls['numberOfSeatsUp'].value,
      };

      this.crudService.updateObject(Collections.TICKETS, ticket.id, data);
    } else {
      alert('ERROR');
    }
  }

  submitCreatingForm() {
    if (this.createForm.valid) {
      const data: Ticket = {
        status: this.createForm.controls['statusCr'].value,
        placeFrom: this.createForm.controls['placeFromCr'].value,
        placeTo: this.createForm.controls['placeToCr'].value,
        date: this.createForm.controls['dateCr'].value,
        numberOfSeats: this.createForm.controls['numberOfSeatsCr'].value,
      };

      this.crudService.createObject(Collections.TICKETS, data);
      const form = document.getElementById('createForm');
      if (form) form.style.display = 'none';
    } else {
      alert('ERROR');
    }
  }

  public bookingTheTicket(ticket: TicketStore) {
    this.booking.forEach((booking) => {
      if (booking.userId.toString() == localStorage.getItem('userID')) {
        this.currentBooking.push(booking);
      }
    });

    if (this.currentBooking.length == 0) {
      this.crudService.createObject(Collections.BOOKING, {
        userId: localStorage.getItem('userID'),
        ticketId: [],
      });
    }

    this.crudService.updateObject(
      Collections.BOOKING,
      this.currentBooking[0].id,
      {
        ticketId: [...this.currentBooking[0].ticketId, ticket.id],
      }
    );
    this.crudService.updateObject(Collections.TICKETS, ticket.id, {
      numberOfSeats: ticket.numberOfSeats - 1,
    });
  }

  showUpdateForm() {
    const form = document.getElementById('updateForm');
    if (form) form.style.display = 'block';
  }

  showCreateForm() {
    const form = document.getElementById('createForm');
    if (form) form.style.display = 'block';
  }

  deleteTicket(ticket: TicketStore) {
    this.crudService.deleteObject(Collections.TICKETS, ticket.id);
  }

  showAll() {
    this.isFiltered = true;
  }

  createTicket() {}
}
