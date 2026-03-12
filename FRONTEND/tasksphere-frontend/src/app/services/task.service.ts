import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public apiUrl = 'http://localhost:5148/api/Tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res: any) => {
        if (Array.isArray(res)) {
          return res as Task[];
        }
        if (res && Array.isArray(res.tasks)) {
          return res.tasks as Task[];
        }
        return [] as Task[];
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      timeout(5000),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  updateTask(id: number, changes: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, changes);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}