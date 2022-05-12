import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      phone: new FormControl("", [Validators.required, Validators.minLength(11)]),
      hash: new FormControl("", [Validators.required, Validators.minLength(7)]),
      role: new FormControl("user", [Validators.required, Validators.minLength(4)]),
    })
  }

  signup(): void {
    console.log(this.signupForm.value)
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      this.router.navigate(["login"]);
    })
  }

}
