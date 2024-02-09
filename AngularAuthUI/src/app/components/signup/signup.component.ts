import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  signUpForm!: FormGroup

  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router) { }
    ngOnInit(): void {
      this.signUpForm = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        username: ['', Validators.required],
        password:['',Validators.required]
      })
    }
  onSignup() {
    if (this.signUpForm.valid) {
      //send the obj to database
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message)
            this.signUpForm.reset();
            this.router.navigate(["login"]);
          },
          error: (err) => {
            console.error('Signup Error:', err);
            alert(err?.error.message)
          }
        })
      console.log(this.signUpForm.value)
    } else {
      //throw the error using toaster and with required fields

    ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid")
    }
  }
 
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
