import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      phone: new FormControl("", [Validators.required, Validators.minLength(11)]),
      hash: new FormControl("", [Validators.required, Validators.minLength(7)]),
    })
  }

  login(): void {
    this.authService.login(this.loginForm.value.phone, this.loginForm.value.hash).subscribe(
      (value) => {
        // if (localStorage.getItem('token') == undefined) alert('ERROR')
        console.log(value)
      }
    );
  }

}
