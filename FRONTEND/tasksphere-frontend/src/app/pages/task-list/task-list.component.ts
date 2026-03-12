import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;
  error: string | null = null;
  
  searchTerm: string = '';
  statusFilter: string = 'All';
  sortBy: string = 'newest';

  constructor(
    private taskService: TaskService,
    private cd: ChangeDetectorRef,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = null;
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res || [];
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.error = `Connection failed. Please ensure the backend is running.`;
        if (err.status === 500) {
          this.error = "Database Error: Please ensure migrations are applied.";
        }
        this.cd.detectChanges();
      }
    });
  }

  trackById(index: number, task: Task) {
    return task.id;
  }

  editTask(task: Task): void {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  deleteTask(task: Task): void {
    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) {
      return;
    }
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: err => {
        alert(`Could not delete task.`);
      }
    });
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getCount(status: string): number {
    return this.tasks.filter(t => t.status?.toLowerCase().includes(status.toLowerCase())).length;
  }

  getPriorityClass(priority: string): string {
    const p = priority?.toLowerCase() || '';
    if (p.includes('high')) return 'badge-high';
    if (p.includes('medium')) return 'badge-medium';
    return 'badge-low';
  }

  getStatusClass(status: string): string {
    const s = status?.toLowerCase() || '';
    if (s.includes('completed')) return 'status-completed';
    if (s.includes('progress')) return 'status-in-progress';
    return 'status-todo';
  }

  get filteredTasks(): Task[] {
    let filtered = this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                           task.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'All' || task.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });

    
    return filtered.sort((a, b) => {
      if (this.sortBy === 'newest') return b.id - a.id;
      if (this.sortBy === 'oldest') return a.id - b.id;
      if (this.sortBy === 'priority') {
        const priorityMap: any = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return (priorityMap[b.priority || 'Low'] || 0) - (priorityMap[a.priority || 'Low'] || 0);
      }
      return 0;
    });
  }
}