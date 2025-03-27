import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  names: string[] = [];
  searchTerm: string = ""; // Bind this to the input field
  user_name: string = ""; // Declare user_name property

  private users = inject(UserService);

  // Fetch users on initialization
  ngOnInit(): void {
    this.names = this.users.getnames("") // Load all users initially
  }

  // Search method triggered on input change
  onSearch(): void {
    this.names = this.users.getnames(this.searchTerm);
  }
  // Add new user to the list
  addUser(): void {
    if (this.user_name.trim()) { // Prevent adding empty names
      this.users.addName(this.user_name);
      this.names = [...this.users.names]; // Refresh the list

      //reset the input
      this.user_name = "";
    }
  }

  onDelete(id: number): void {
    this.users.removeName(id);
    this.names = [...this.users.names]; // Update the displayed list
  }
  
  
}
