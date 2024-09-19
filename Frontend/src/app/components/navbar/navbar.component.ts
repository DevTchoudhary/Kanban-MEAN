import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  // This method can be removed since we are using routerLink
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
