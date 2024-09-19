import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
  
      if (this.router.url === '/login' && token) {
        // Redirect authenticated users away from the login page
        this.router.navigate(['/home']);
        return false;
      }
  
      if (token) {
        return true; // User is authenticated
      } else {
        this.router.navigate(['/login']);
        return false; // User is not authenticated
      }
    }
  
    return true; // Adjust this based on your requirements
  }
  
}
