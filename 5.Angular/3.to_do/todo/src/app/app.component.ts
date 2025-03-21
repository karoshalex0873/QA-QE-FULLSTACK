import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface todoItem {
  id: number;
  task: string;
  completed: boolean;
  createdAt: Date;
  isEditing?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  todoList: todoItem[] = [];
  newTask: string = '';

  addTask() {
    if (this.newTask.trim() === '') return;

    const newTodo: todoItem = {
      id: this.todoList.length + 1,
      task: this.newTask,
      completed: false,
      createdAt: new Date(),
      isEditing: false
    };

    this.todoList.push(newTodo);
    this.newTask = '';
  }

  // Toggle complete task
  toggleComplete(index: number) {
    this.todoList[index].completed = !this.todoList[index].completed;
  }

  // Delete task
  deleteTask(id: number) {
    this.todoList = this.todoList.filter((item) => item.id !== id);
  }

  // Enable editing mode
  editTask(index: number) {
    this.todoList[index].isEditing = true;
  }

  // Save edited task
  saveTask(index: number) {
    if (this.todoList[index].task.trim() === '') {
      alert('Task cannot be empty.');
      return;
    }
    this.todoList[index].isEditing = false;
    this.todoList[index].createdAt = new Date(); // Update the timestamp
  }
}
