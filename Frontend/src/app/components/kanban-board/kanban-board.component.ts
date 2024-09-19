import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent {
  inviteForm: FormGroup; 
  inviteLink: string = ''; 

  constructor(private fb: FormBuilder, private router: Router) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  generateInvite() {
    if (this.inviteForm.valid) {
      const email = this.inviteForm.value.email; 
      this.inviteLink = `https://your-invite-api.com/invite?email=${email}`;
      
      // Simulating a redirection to the login page when the invite link is clicked
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000); // Redirect after 3 seconds, adjust as necessary
    }
  }
}
