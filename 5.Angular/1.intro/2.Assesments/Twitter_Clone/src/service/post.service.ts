import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl='https://jsonplaceholder.typicode.com/posts'
  constructor(private http:HttpClient) { }
  // get all posts
  getPostByUser(userId:number):Observable<Post []>{
    return this.http.get<Post[]>(`${this.postUrl}?userId=${userId}`)
  }
}
