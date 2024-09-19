import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

 interface Task {
  id: number;
  date: string;
  name: string;
  status: 'todo' | 'inProgress' | 'completed';
  important?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks'; 

  constructor(private http: HttpClient) {}

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token'); // Adjust as necessary
    }
    return null;
  }

  // Fetch tasks from the backend
  getTasks(): Observable<Task[]> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('No authentication token found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.get<Task[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError(() => new Error('Failed to fetch tasks. Please try again later.'));
      })
    );
  }

  // Add a new task
  addTask(task: Task): Observable<Task> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('No authentication token found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.post<Task>(this.apiUrl, task, { headers }).pipe(
      catchError(error => {
        console.error('Error adding task:', error);
        return throwError(() => new Error('Failed to add task. Please try again later.'));
      })
    );
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('No authentication token found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting task:', error);
        return throwError(() => new Error('Failed to delete task. Please try again later.'));
      })
    );
  }

  // Update task status
  updateTaskStatus(id: string, status: 'todo' | 'inProgress' | 'completed'): Observable<Task> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('No authentication token found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status }, { headers }).pipe(
      catchError(error => {
        console.error('Error updating task status:', error);
        return throwError(() => new Error('Failed to update task status. Please try again later.'));
      })
    );
  }
}
