import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  // User names list
  names: string[] = ["Alice", "Bob", "John", "Adrian", "Susan"];

  // Get user names (filtering by search term)
  getnames(searchTerm:string){
    return this.names.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  // Add new user name
  addName(name: string) {
    this.names.push(name);
  }

  // Remove user name
  removeName(id: number) {
    this.names.splice(id, 1);
  }
}
