import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Sample tasks for the Kanban board
  todo = [
    { id: 1, title: 'Task 1', description: 'Task 1 Description' },
    { id: 2, title: 'Task 2', description: 'Task 2 Description' },
  ];

  inProgress = [
    { id: 3, title: 'Task 3', description: 'Task 3 Description' },
  ];

  done = [
    { id: 4, title: 'Task 4', description: 'Task 4 Description' },
  ];

  col = [
    { id: 5, title: 'New Column', description: 'Description for new column', tasks: [] },
  ];

  connectedLists: string[] = [];

  constructor(private taskService: TaskService) {
    this.updateConnectedLists();
  }

  // This method will update the connected list IDs
  updateConnectedLists() {
    this.connectedLists = ['todo', 'inProgress', 'done', 'col']; // Update this based on your columns
  }

  // Drag and Drop event handler
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Move task within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move task to another column
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // Method to add a new task
  addTask(list: any[]) {
    const title = prompt('Enter task title');
    const description = prompt('Enter task description');
    if (title && description) {
      const newTask = {
        id: new Date().getTime(),  // Simple ID generation
        title,
        description
      };
      list.push(newTask);
    } else {
      alert('Both title and description are required to create a task!');
    }
  }

  // Edit Task
  editTask(task: any) {
    const newTitle = prompt('Edit task title:', task.title);
    const newDescription = prompt('Edit task description:', task.description);
    if (newTitle !== null) task.title = newTitle;
    if (newDescription !== null) task.description = newDescription;
  }

  // Delete Task
  deleteTask(taskArray: any[], task: any) {
    const index = taskArray.indexOf(task);
    if (index > -1) {
      taskArray.splice(index, 1);
    }
  }

  // Method to add a new column
  addColumn() {
    const ctitle = prompt('Enter column title:', 'New Column');
    if (ctitle) {
      const newColDetails = {
        id: new Date().getTime(), // Ensure unique ID
        title: ctitle,
        description: 'Description for new column',
        tasks: [],
      };
      this.col.push(newColDetails);
      this.updateConnectedLists();
    } else {
      alert('Column title cannot be empty!');
    }
  }
}
