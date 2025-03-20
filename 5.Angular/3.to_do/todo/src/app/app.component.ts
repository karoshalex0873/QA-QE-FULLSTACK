import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface todoItem {
  id: number
  task: string
  completed: boolean
  createdAt: Date
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  todoList: todoItem[] = []
  newTask: string = ''

  addTask() {
    if (this.newTask.trim() === '') return

    const newTodo: todoItem = {
      id: this.todoList.length + 1,
      task: this.newTask,
      completed: false,
      createdAt: new Date()
    }

    this.todoList.push(newTodo)
    this.newTask = ''
    console.log(newTodo.task)
  }

  //complete task
  toggleComplete(index: number) {
    this.todoList[index].completed = !this.todoList[index].completed
    console.log(this.todoList)
  }
  //delete task
  deleteTask(id: number) {
   this.todoList= this.todoList.filter((item) => item.id !== id)
    console.log(this.todoList)
  }
}
