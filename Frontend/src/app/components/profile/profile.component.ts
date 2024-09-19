import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  name: string = '';
  bio: string = '';
  workDomain: string = '';
  email: string = '';
  phone: string = '';
  skills: string[] = ['JavaScript', 'Angular', 'Node.js', 'Machine Learning'];
  newSkill: string = '';

  editMode: boolean = true;

  // Add a new skill
  addSkill() {
    if (this.newSkill.trim()) {
      this.skills.push(this.newSkill);
      this.newSkill = ''; // Clear the input field
    }
  }

  // Save the profile
  saveProfile() {
    this.editMode = false; // Disable edit mode after saving
    // You can add logic to save the profile data, e.g., call a service to save it to a database
    console.log('Profile saved:', {
      name: this.name,
      bio: this.bio,
      workDomain: this.workDomain,
      email: this.email,
      phone: this.phone,
      skills: this.skills
    });
  }

  // Toggle edit mode
  toggleEdit() {
    this.editMode = !this.editMode;
  }
}
