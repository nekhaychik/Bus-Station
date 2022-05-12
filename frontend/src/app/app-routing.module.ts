import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AuthGuard } from './services/auth.guard';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "tickets", component: TicketsComponent, canActivate: [AuthGuard] },
  { path: "booking", component: BookingComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
