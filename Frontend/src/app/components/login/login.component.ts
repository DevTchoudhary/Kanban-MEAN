import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup; // FormGroup to handle form data
  isNewUser: boolean = false; // Flag for user type (login or register)
  private subscriptions: Subscription = new Subscription(); // Store subscriptions

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {
    this.createForm(); // Initialize the form
  }

  // Initialize the form controls
  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    });

    // Adjust confirmPassword validator based on user type
    this.toggleConfirmPasswordValidator();
  }

  // Toggle validators for confirmPassword based on user type (new user or existing)
  toggleConfirmPasswordValidator() {
    const confirmPasswordControl = this.loginForm.get('confirmPassword');
    if (this.isNewUser) {
      confirmPasswordControl?.setValidators([Validators.required]);
    } else {
      confirmPasswordControl?.clearValidators();
    }
    confirmPasswordControl?.updateValueAndValidity();
  }

  // Toggle between login and registration
  toggleUserType() {
    this.isNewUser = !this.isNewUser;
    this.toggleConfirmPasswordValidator();
    this.loginForm.reset();
  }

  // Form submit handler
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password, confirmPassword } = this.loginForm.value;

      if (this.isNewUser && password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // If it's a new user, call the registration method
      if (this.isNewUser) {
        const registerSubscription = this.authService.register(username, password).subscribe({
          next: (response: any) => { // Use any type for response
            console.log('Registration successful', response);
            alert('Registration successful!');
            this.router.navigate(['/home']);
          },
          error: (error: HttpErrorResponse) => { // Specify type for error
            console.error('Registration failed', error);
            alert('Registration failed!');
          }
        });
        this.subscriptions.add(registerSubscription); // Add subscription to the list
      } 
      // If it's an existing user, call the login method
      else {
        const loginSubscription = this.authService.login(username, password).subscribe({
          next: (response: any) => { // Use any type for response
            console.log('Login successful', response);
            localStorage.setItem("token", response.token);
            alert('Login successful!');
            this.router.navigate(['/home']);
          },
          error: (error: HttpErrorResponse) => { // Specify type for error
            console.error('Login failed', error);
            alert('Login failed!');
          }
        });
        this.subscriptions.add(loginSubscription); // Add subscription to the list
      }
    } else {
      alert('Please fill all required fields correctly!');
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Unsubscribe from all subscriptions
  }
}
