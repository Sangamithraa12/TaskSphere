import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  title: string = '';
  description: string = '';
  status: string = 'To Do';
  priority: string = 'Medium';

  editing = false;
  taskId?: number;
  isLoading = false;
  errorMsg = '';
  dueDate: string = '';

  constructor(
    private taskService: TaskService,
    public router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.taskId = +idParam;
      this.isLoading = true;
      this.taskService.getTask(this.taskId).subscribe({
        next: (response: any) => {
          try {
            if (!response) {
              this.errorMsg = 'Task not found.';
              return;
            }

            const data = response.task ? response.task : response;

            if (!data || !data.title) {
              this.errorMsg = 'Invalid data received from server.';
              return;
            }

            this.title = data.title;
            this.description = data.description;
            this.status = data.status || 'To Do';
            this.priority = data.priority || 'Medium';

            if (data.dueDate) {
              try {
                this.dueDate = new Date(data.dueDate).toISOString().split('T')[0];
              } catch (e) {
                this.dueDate = '';
              }
            }
            
            this.cd.detectChanges();
          } catch (err) {
            this.errorMsg = 'An error occurred while processing task data.';
          } finally {
            this.isLoading = false;
          }
        },
        error: err => {
          this.errorMsg = 'Could not load task details.';
          this.isLoading = false;
        }
      });
    }
  }

  saveTask(): void {
    this.isLoading = true;
    this.errorMsg = '';

    const task = {
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      dueDate: this.dueDate ? this.dueDate : undefined
    };

    if (this.editing && this.taskId != null) {
      this.taskService.updateTask(this.taskId, task).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.router.navigate(['/tasks']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('API Update Error:', err);
          this.isLoading = false;
          this.errorMsg = 'Failed to update task. Please try again.';
        }
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.router.navigate(['/tasks']);
        },
        error: (err: HttpErrorResponse) => {
          console.error('API Create Error:', err);
          this.isLoading = false;
          this.errorMsg = 'Failed to create task. Please try again.';
        }
      });
    }
  }

}